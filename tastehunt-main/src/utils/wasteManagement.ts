/**
 * Food Waste Management Utility Functions
 * 
 * This module provides functions to optimize inventory, predict demand,
 * and reduce food waste in the food delivery system.
 */

interface Restaurant {
  id: string;
  name: string;
  averageOrdersPerDay: number;
  preparationTime: number;
}

interface MenuItem {
  id: string;
  name: string;
  ingredients: Ingredient[];
  popularityScore: number;
  shelfLife: number; // in hours
  sustainabilityScore: number;
}

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  shelfLife: number; // in hours
  currentStock: number;
  reorderPoint: number;
  sustainabilityScore: number;
}

interface Order {
  id: string;
  restaurantId: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
  orderTime: Date;
  estimatedDeliveryTime: Date;
}

/**
 * Calculates the sustainability score for a menu item based on its ingredients
 */
export function calculateSustainabilityScore(menuItem: MenuItem): number {
  if (!menuItem.ingredients.length) return 0;
  
  const totalScore = menuItem.ingredients.reduce(
    (sum, ingredient) => sum + ingredient.sustainabilityScore,
    0
  );
  
  return Math.round(totalScore / menuItem.ingredients.length);
}

/**
 * Predicts demand for ingredients based on historical order data
 */
export function predictIngredientDemand(
  restaurant: Restaurant,
  menuItems: MenuItem[],
  pastOrders: Order[],
  daysToForecast: number
): { [ingredientId: string]: number } {
  const ingredientDemand: { [ingredientId: string]: number } = {};
  
  // Initialize demand for all ingredients
  menuItems.forEach(item => {
    item.ingredients.forEach(ingredient => {
      if (!ingredientDemand[ingredient.id]) {
        ingredientDemand[ingredient.id] = 0;
      }
    });
  });
  
  // Group past orders by day
  const ordersByDay: { [day: string]: Order[] } = {};
  
  pastOrders.forEach(order => {
    const orderDay = order.orderTime.toISOString().split('T')[0];
    if (!ordersByDay[orderDay]) {
      ordersByDay[orderDay] = [];
    }
    ordersByDay[orderDay].push(order);
  });
  
  // Calculate average daily usage for each ingredient
  const uniqueDays = Object.keys(ordersByDay).length;
  
  // Skip if no historical data
  if (uniqueDays === 0) return ingredientDemand;
  
  // Calculate ingredient usage from historical orders
  Object.values(ordersByDay).forEach(dailyOrders => {
    dailyOrders.forEach(order => {
      order.items.forEach(orderItem => {
        const menuItem = menuItems.find(item => item.id === orderItem.menuItemId);
        if (menuItem) {
          menuItem.ingredients.forEach(ingredient => {
            ingredientDemand[ingredient.id] += 
              ingredient.quantity * orderItem.quantity / uniqueDays;
          });
        }
      });
    });
  });
  
  // Scale by forecast period
  Object.keys(ingredientDemand).forEach(ingredientId => {
    ingredientDemand[ingredientId] *= daysToForecast;
  });
  
  return ingredientDemand;
}

/**
 * Calculates optimal inventory levels to minimize waste
 */
export function calculateOptimalInventory(
  restaurant: Restaurant,
  ingredients: Ingredient[],
  predictedDemand: { [ingredientId: string]: number }
): { [ingredientId: string]: number } {
  const optimalInventory: { [ingredientId: string]: number } = {};
  
  ingredients.forEach(ingredient => {
    const dailyDemand = predictedDemand[ingredient.id] || 0;
    
    // Calculate safety stock (30% buffer over predicted demand)
    const safetyStock = dailyDemand * 0.3;
    
    // Consider shelf life to avoid overstocking perishable items
    const maxInventoryBasedOnShelfLife = dailyDemand * (ingredient.shelfLife / 24) * 0.9;
    
    // Optimal inventory is the minimum of shelf-life constrained inventory and demand + safety stock
    optimalInventory[ingredient.id] = Math.min(
      dailyDemand + safetyStock,
      maxInventoryBasedOnShelfLife
    );
  });
  
  return optimalInventory;
}

/**
 * Estimates food waste reduction based on inventory optimization
 */
export function estimateWasteReduction(
  currentInventory: { [ingredientId: string]: number },
  optimalInventory: { [ingredientId: string]: number },
  ingredients: Ingredient[]
): {
  totalCurrentWaste: number;
  totalOptimizedWaste: number;
  reductionPercentage: number;
  savingsPerIngredient: { [ingredientId: string]: number };
} {
  let totalCurrentWaste = 0;
  let totalOptimizedWaste = 0;
  const savingsPerIngredient: { [ingredientId: string]: number } = {};
  
  ingredients.forEach(ingredient => {
    const current = currentInventory[ingredient.id] || 0;
    const optimal = optimalInventory[ingredient.id] || 0;
    
    // Simplified waste estimation based on excess inventory and shelf life
    const currentWaste = Math.max(0, current - ingredient.reorderPoint) * 
      (ingredient.shelfLife < 48 ? 0.2 : 0.1);
    
    const optimizedWaste = Math.max(0, optimal - ingredient.reorderPoint) * 
      (ingredient.shelfLife < 48 ? 0.1 : 0.05);
    
    totalCurrentWaste += currentWaste;
    totalOptimizedWaste += optimizedWaste;
    
    savingsPerIngredient[ingredient.id] = currentWaste - optimizedWaste;
  });
  
  const reductionPercentage = totalCurrentWaste > 0 
    ? ((totalCurrentWaste - totalOptimizedWaste) / totalCurrentWaste) * 100 
    : 0;
  
  return {
    totalCurrentWaste,
    totalOptimizedWaste,
    reductionPercentage,
    savingsPerIngredient
  };
}

/**
 * Recommends portion sizes to minimize waste while maintaining customer satisfaction
 */
export function optimizePortionSizes(
  menuItem: MenuItem,
  averageConsumptionRate: number // percentage of food typically consumed by customers
): {
  currentPortionSustainability: number;
  optimizedPortionSustainability: number;
  recommendedReduction: number;
  wasteReduction: number;
} {
  // If customers typically eat 85% of food, there's 15% waste
  const currentWastePercentage = 100 - averageConsumptionRate;
  
  // Calculate how much we can reduce portions while keeping customers satisfied
  // We don't want to reduce to exactly 100% consumption as that might leave customers hungry
  // Instead we aim for 95% consumption (a slight feeling of satisfaction/fullness)
  const idealConsumptionRate = 95;
  const possibleReduction = Math.max(0, (idealConsumptionRate - averageConsumptionRate) / averageConsumptionRate);
  
  // Cap the reduction at 15% to avoid customer dissatisfaction
  const recommendedReduction = Math.min(possibleReduction, 0.15);
  
  // Calculate waste reduction
  const newWastePercentage = 100 - (averageConsumptionRate * (1 + recommendedReduction));
  const wasteReduction = Math.max(0, currentWastePercentage - newWastePercentage);
  
  // Sustainability impact
  const currentPortionSustainability = menuItem.sustainabilityScore;
  const optimizedPortionSustainability = Math.min(
    100,
    currentPortionSustainability + (wasteReduction * 0.5)
  );
  
  return {
    currentPortionSustainability,
    optimizedPortionSustainability,
    recommendedReduction: recommendedReduction * 100, // Convert to percentage
    wasteReduction
  };
}

/**
 * Calculates the environmental impact of food waste reduction
 */
export function calculateEnvironmentalImpact(
  wasteReductionInKg: number
): {
  co2Saved: number; // in kg
  waterSaved: number; // in liters
  landSaved: number; // in square meters
} {
  // Average CO2 equivalent per kg of food waste
  const co2PerKgFoodWaste = 2.5;
  
  // Average water footprint per kg of food waste
  const waterPerKgFoodWaste = 1000;
  
  // Average land use per kg of food waste
  const landPerKgFoodWaste = 0.5;
  
  return {
    co2Saved: wasteReductionInKg * co2PerKgFoodWaste,
    waterSaved: wasteReductionInKg * waterPerKgFoodWaste,
    landSaved: wasteReductionInKg * landPerKgFoodWaste
  };
}

/**
 * Suggests deals for items approaching expiration to reduce waste
 */
export function suggestWasteReductionDeals(
  restaurant: Restaurant,
  menuItems: MenuItem[],
  ingredients: Ingredient[]
): {
  menuItemId: string;
  discountPercentage: number;
  expirationTimeframe: string;
  reason: string;
}[] {
  const deals = [];
  
  // Current time
  const now = new Date();
  
  // Check each menu item for ingredients approaching expiration
  menuItems.forEach(menuItem => {
    const criticalIngredients = menuItem.ingredients.filter(ingredientRef => {
      const ingredient = ingredients.find(i => i.id === ingredientRef.id);
      if (!ingredient) return false;
      
      // Check if stock is high and ingredient is approaching expiration
      const isOverstocked = ingredient.currentStock > ingredient.reorderPoint * 1.5;
      
      // Calculate rough remaining shelf life (simplified)
      const remainingShelfLifeHours = ingredient.shelfLife / 2; // Assume ingredients are halfway through shelf life
      
      return isOverstocked && remainingShelfLifeHours < 24;
    });
    
    if (criticalIngredients.length > 0) {
      // Calculate discount based on urgency
      const mostCriticalIngredient = criticalIngredients.reduce(
        (most, current) => {
          const mostIngredient = ingredients.find(i => i.id === most.id);
          const currentIngredient = ingredients.find(i => i.id === current.id);
          
          if (!mostIngredient || !currentIngredient) return most;
          
          return mostIngredient.shelfLife < currentIngredient.shelfLife ? most : current;
        },
        criticalIngredients[0]
      );
      
      const ingredient = ingredients.find(i => i.id === mostCriticalIngredient.id);
      if (!ingredient) return;
      
      // Calculate discount (higher for more urgent cases)
      let discountPercentage = 15; // Default discount
      let expirationTimeframe = 'today';
      
      if (ingredient.shelfLife < 12) {
        discountPercentage = 25;
        expirationTimeframe = 'within 12 hours';
      } else if (ingredient.shelfLife < 18) {
        discountPercentage = 20;
        expirationTimeframe = 'today';
      }
      
      deals.push({
        menuItemId: menuItem.id,
        discountPercentage,
        expirationTimeframe,
        reason: `Contains ${ingredient.name} which will expire ${expirationTimeframe}`
      });
    }
  });
  
  return deals;
}

/**
 * Calculates user's personal impact on food waste reduction
 */
export function calculateUserSustainabilityImpact(
  userOrders: Order[],
  menuItems: { [id: string]: MenuItem }
): {
  totalOrdersPlaced: number;
  averageSustainabilityScore: number;
  totalWasteReduction: number;
  co2Impact: number;
  waterSaved: number;
} {
  if (userOrders.length === 0) {
    return {
      totalOrdersPlaced: 0,
      averageSustainabilityScore: 0,
      totalWasteReduction: 0,
      co2Impact: 0,
      waterSaved: 0
    };
  }
  
  let totalSustainabilityScore = 0;
  let totalItems = 0;
  
  // Calculate total sustainability score across all orders
  userOrders.forEach(order => {
    order.items.forEach(item => {
      const menuItem = menuItems[item.menuItemId];
      if (menuItem) {
        totalSustainabilityScore += menuItem.sustainabilityScore * item.quantity;
        totalItems += item.quantity;
      }
    });
  });
  
  const averageSustainabilityScore = totalItems > 0 
    ? totalSustainabilityScore / totalItems 
    : 0;
  
  // Estimate waste reduction (simplified)
  // Assume average meal generates 0.5kg of waste without optimization
  const averageMealWaste = 0.5; // in kg
  const wasteReductionFactor = averageSustainabilityScore / 100;
  const totalWasteReduction = totalItems * averageMealWaste * wasteReductionFactor;
  
  // Calculate environmental impact
  const environmentalImpact = calculateEnvironmentalImpact(totalWasteReduction);
  
  return {
    totalOrdersPlaced: userOrders.length,
    averageSustainabilityScore,
    totalWasteReduction,
    co2Impact: environmentalImpact.co2Saved,
    waterSaved: environmentalImpact.waterSaved
  };
}
