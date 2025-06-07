/**
 * Fraud Detection Utility Functions
 * 
 * This module provides functions to detect potentially fraudulent orders
 * and suspicious user behavior in the food delivery system.
 */

interface OrderData {
  userId: string;
  totalAmount: number;
  items: {
    id: string;
    quantity: number;
    price: number;
  }[];
  deliveryAddress: string;
  paymentMethod: string;
  cardDetails?: {
    lastFour: string;
    expiryMonth: string;
    expiryYear: string;
  };
}

interface FraudDetectionResult {
  isFraudulent: boolean;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[];
  requiresOTP: boolean;
}

/**
 * Enhanced fraud analysis with more reasonable OTP trigger patterns
 */
export function analyzeFraudRisk(order: OrderData): FraudDetectionResult {
  const flags: string[] = [];
  let riskScore = 0;
  
  // Check for unusually large order amounts (more reasonable thresholds)
  if (order.totalAmount > 2000) {
    flags.push('extremely_high_order_amount');
    riskScore += 60;
  } else if (order.totalAmount > 1000) {
    flags.push('unusually_high_order_amount');
    riskScore += 40;
  } else if (order.totalAmount > 500) {
    flags.push('high_order_amount');
    riskScore += 20;
  }
  
  // Check for unusually large quantities (more reasonable thresholds)
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
  if (totalQuantity > 50) {
    flags.push('extremely_high_total_quantity');
    riskScore += 50;
  } else if (totalQuantity > 25) {
    flags.push('high_total_quantity');
    riskScore += 30;
  }
  
  // Check for single item high quantity (more reasonable thresholds)
  const hasVeryHighQuantityItems = order.items.some(item => item.quantity > 20);
  if (hasVeryHighQuantityItems) {
    flags.push('very_high_single_item_quantity');
    riskScore += 40;
  }
  
  const hasHighQuantityItems = order.items.some(item => item.quantity > 10);
  if (hasHighQuantityItems) {
    flags.push('high_single_item_quantity');
    riskScore += 20;
  }
  
  // Check for known suspicious payment methods
  if (order.cardDetails?.lastFour === '1234') {
    flags.push('suspicious_card_pattern');
    riskScore += 60;
  }
  
  // Late night ordering pattern (potential fraud) - only for very high amounts
  const currentHour = new Date().getHours();
  if (currentHour >= 2 && currentHour <= 5 && order.totalAmount > 1000) {
    flags.push('unusual_time_high_amount');
    riskScore += 25;
  }
  
  // Multiple expensive items (potential resale fraud) - higher threshold
  const expensiveItems = order.items.filter(item => item.price > 500);
  if (expensiveItems.length > 5) {
    flags.push('multiple_expensive_items');
    riskScore += 30;
  }
  
  // Determine risk level and OTP requirement with higher thresholds
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  let requiresOTP = false;
  
  if (riskScore >= 80) {
    riskLevel = 'high';
    requiresOTP = true;
  } else if (riskScore >= 60) {
    riskLevel = 'high';
    requiresOTP = true;
  } else if (riskScore >= 40) {
    riskLevel = 'medium';
    requiresOTP = false;
  }
  
  return {
    isFraudulent: riskScore >= 80,
    riskScore,
    riskLevel,
    flags,
    requiresOTP
  };
}

/**
 * Verifies if a user's behavior pattern is suspicious based on order history
 */
export function detectSuspiciousBehavior(
  currentOrder: OrderData,
  recentOrders: OrderData[],
  userAccountAgeInDays: number
): FraudDetectionResult {
  const flags: string[] = [];
  let riskScore = 0;
  
  // New account with large order (more reasonable thresholds)
  if (userAccountAgeInDays < 1 && currentOrder.totalAmount > 500) {
    flags.push('new_account_large_order');
    riskScore += 40;
  } else if (userAccountAgeInDays < 3 && currentOrder.totalAmount > 1000) {
    flags.push('very_new_account_large_order');
    riskScore += 35;
  }
  
  // Multiple orders in short time period (more reasonable thresholds)
  if (recentOrders.length > 10) {
    flags.push('excessive_orders_short_period');
    riskScore += 40;
  } else if (recentOrders.length > 7) {
    flags.push('multiple_orders_short_period');
    riskScore += 25;
  }
  
  // Rapid order escalation pattern (more reasonable threshold)
  if (recentOrders.length > 0) {
    const averagePastAmount = recentOrders.reduce((sum, order) => sum + order.totalAmount, 0) / recentOrders.length;
    if (currentOrder.totalAmount > averagePastAmount * 5) {
      flags.push('order_amount_escalation');
      riskScore += 35;
    }
  }
  
  // Inconsistent delivery addresses (more reasonable threshold)
  const uniqueAddresses = new Set([
    ...recentOrders.map(order => order.deliveryAddress),
    currentOrder.deliveryAddress
  ].filter(addr => addr));
  
  if (uniqueAddresses.size > 5 && recentOrders.length > 2) {
    flags.push('multiple_delivery_addresses');
    riskScore += 30;
  }
  
  // Different payment methods across recent orders (more reasonable threshold)
  const uniquePaymentMethods = new Set(
    [...recentOrders, currentOrder].map(order => order.paymentMethod)
  );
  if (uniquePaymentMethods.size > 3) {
    flags.push('multiple_payment_methods');
    riskScore += 25;
  }
  
  // Determine risk level and OTP requirement with higher thresholds
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  let requiresOTP = false;
  
  if (riskScore >= 70) {
    riskLevel = 'high';
    requiresOTP = true;
  } else if (riskScore >= 50) {
    riskLevel = 'high';
    requiresOTP = true;
  } else if (riskScore >= 30) {
    riskLevel = 'medium';
    requiresOTP = false;
  }
  
  return {
    isFraudulent: riskScore >= 70,
    riskScore,
    riskLevel,
    flags,
    requiresOTP
  };
}

/**
 * Validates a credit card number using the Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length === 0) return false;
  
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
}

/**
 * Check if a payment might be from a stolen card
 */
export function checkStolenCardRisk(
  cardDetails: {
    lastFour: string;
    expiryMonth: string;
    expiryYear: string;
  },
  billingAddress: string,
  deliveryAddress: string
): FraudDetectionResult {
  const flags: string[] = [];
  let riskScore = 0;
  
  const compromisedLastFours = ['1234', '4321', '0000'];
  if (compromisedLastFours.includes(cardDetails.lastFour)) {
    flags.push('potentially_compromised_card');
    riskScore += 40;
  }
  
  if (billingAddress && deliveryAddress && 
      billingAddress.split(',')[0] !== deliveryAddress.split(',')[0]) {
    flags.push('address_mismatch');
    riskScore += 20;
  }
  
  const currentDate = new Date();
  const expiryDate = new Date(
    parseInt(cardDetails.expiryYear), 
    parseInt(cardDetails.expiryMonth) - 1
  );
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
  
  if (expiryDate <= oneMonthFromNow) {
    flags.push('card_near_expiry');
    riskScore += 5;
  }
  
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  let requiresOTP = false;
  
  if (riskScore >= 40) {
    riskLevel = 'high';
    requiresOTP = true;
  } else if (riskScore >= 20) {
    riskLevel = 'medium';
  }
  
  return {
    isFraudulent: riskScore >= 40,
    riskScore,
    riskLevel,
    flags,
    requiresOTP
  };
}
