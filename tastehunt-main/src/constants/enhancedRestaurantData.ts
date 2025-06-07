
export const enhancedRestaurants = [
  {
    id: 1,
    name: "Satvam Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    cuisine: "Farm-to-Table",
    rating: 4.8,
    deliveryTime: "25-35 min",
    wasteReduction: "95%",
    tags: ["Organic", "Local", "Vegetarian"],
    menu: {
      appetizers: [
        { id: 1, name: "Paneer Tikka", price: 180, description: "Grilled cottage cheese marinated in spices and yogurt", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80" },
        { id: 2, name: "Aloo Tikki Chaat", price: 120, description: "Crispy potato patties with tangy chutneys", image: "https://images.unsplash.com/photo-1576040381679-7a7b5b7a4c0e?w=400&auto=format&fit=crop&q=80" },
        { id: 3, name: "Samosa Chaat", price: 140, description: "Crispy samosas topped with yogurt and chutneys", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80" }
      ],
      mains: [
        { id: 4, name: "Dal Makhani", price: 220, description: "Rich black lentils cooked in butter and cream", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80" },
        { id: 5, name: "Palak Paneer", price: 240, description: "Cottage cheese in creamy spinach gravy", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80" },
        { id: 6, name: "Kadai Paneer", price: 260, description: "Cottage cheese cooked with bell peppers in spicy gravy", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80" }
      ],
      breads: [
        { id: 7, name: "Butter Naan", price: 60, description: "Soft leavened bread brushed with butter", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&auto=format&fit=crop&q=80" },
        { id: 8, name: "Garlic Naan", price: 70, description: "Naan bread topped with fresh garlic and herbs", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&auto=format&fit=crop&q=80" }
      ],
      beverages: [
        { id: 9, name: "Masala Chai", price: 40, description: "Traditional spiced tea with milk", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80" },
        { id: 10, name: "Fresh Lime Soda", price: 50, description: "Refreshing lime soda with mint", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 2,
    name: "Mumbai Tadka",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "30-40 min",
    wasteReduction: "88%",
    tags: ["Spicy", "Authentic", "Mumbai Street Food"],
    menu: {
      streetFood: [
        { id: 11, name: "Vada Pav", price: 80, description: "Mumbai's famous burger with spiced potato fritter", image: "https://images.unsplash.com/photo-1626776877865-9cf2ec8e76d5?w=400&auto=format&fit=crop&q=80" },
        { id: 12, name: "Pav Bhaji", price: 150, description: "Spiced mixed vegetable curry with bread", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&auto=format&fit=crop&q=80" },
        { id: 13, name: "Bhel Puri", price: 100, description: "Puffed rice salad with tangy chutneys", image: "https://images.unsplash.com/photo-1640778264999-25fd3f5b9b32?w=400&auto=format&fit=crop&q=80" }
      ],
      curries: [
        { id: 14, name: "Butter Chicken", price: 280, description: "Creamy tomato-based chicken curry", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop&q=80" },
        { id: 15, name: "Chicken Tikka Masala", price: 300, description: "Grilled chicken in spiced tomato gravy", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&auto=format&fit=crop&q=80" },
        { id: 16, name: "Mutton Rogan Josh", price: 350, description: "Tender mutton in aromatic Kashmiri curry", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80" }
      ],
      rice: [
        { id: 17, name: "Chicken Biryani", price: 320, description: "Fragrant basmati rice with spiced chicken", image: "https://images.unsplash.com/photo-1563379091339-03246963d49a?w=400&auto=format&fit=crop&q=80" },
        { id: 18, name: "Mutton Biryani", price: 380, description: "Royal biryani with tender mutton pieces", image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&auto=format&fit=crop&q=80" },
        { id: 19, name: "Vegetable Biryani", price: 250, description: "Aromatic rice with mixed vegetables", image: "https://images.unsplash.com/photo-1564759224907-65b945e60a66?w=400&auto=format&fit=crop&q=80" }
      ],
      desserts: [
        { id: 20, name: "Gulab Jamun", price: 80, description: "Sweet milk dumplings in sugar syrup", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&auto=format&fit=crop&q=80" },
        { id: 21, name: "Chocolate Cake", price: 100, description: "Rich chocolate cake with creamy frosting", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 3,
    name: "Delhi Darbar",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60",
    cuisine: "Indian",
    rating: 4.9,
    deliveryTime: "20-30 min",
    wasteReduction: "92%",
    tags: ["North Indian", "Traditional", "Royal"],
    menu: {
      appetizers: [
        { id: 22, name: "Tandoori Chicken", price: 280, description: "Clay oven roasted chicken with aromatic spices", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&auto=format&fit=crop&q=80" },
        { id: 24, name: "Reshmi Kebab", price: 270, description: "Silky smooth chicken kebabs", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&auto=format&fit=crop&q=80" }
      ],
      curries: [
        { id: 25, name: "Dal Bukhara", price: 200, description: "Slow-cooked black lentils with cream", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80" },
        { id: 26, name: "Shahi Paneer", price: 260, description: "Royal cottage cheese in rich cashew gravy", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80" },
        { id: 27, name: "Chicken Korma", price: 320, description: "Mild chicken curry in yogurt and nut gravy", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop&q=80" }
      ],
      breads: [
        { id: 28, name: "Tandoori Roti", price: 50, description: "Whole wheat bread from clay oven", image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&auto=format&fit=crop&q=80" },
        { id: 29, name: "Kulcha", price: 80, description: "Stuffed leavened bread", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&auto=format&fit=crop&q=80" },
        { id: 30, name: "Paratha", price: 70, description: "Layered flatbread with ghee", image: "https://images.unsplash.com/photo-1627662235230-c2845fb48032?w=400&auto=format&fit=crop&q=80" }
      ],
      desserts: [
        { id: 31, name: "Kulfi", price: 90, description: "Traditional Indian ice cream with cardamom", image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=400&auto=format&fit=crop&q=80" },
        { id: 32, name: "Jalebi", price: 70, description: "Crispy spirals soaked in sugar syrup", image: "https://images.unsplash.com/photo-1606471710834-7e0c4dc2d362?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 4,
    name: "Noodle Junction",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60",
    cuisine: "Asian",
    rating: 4.6,
    deliveryTime: "35-45 min",
    wasteReduction: "85%",
    tags: ["Asian", "Noodles", "Chinese"],
    menu: {
      noodles: [
        { id: 33, name: "Hakka Noodles", price: 180, description: "Indo-Chinese stir-fried noodles with vegetables", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&auto=format&fit=crop&q=80" },
        { id: 34, name: "Schezwan Noodles", price: 200, description: "Spicy noodles with Schezwan sauce", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&auto=format&fit=crop&q=80" },
        { id: 35, name: "Chicken Noodles", price: 220, description: "Noodles stir-fried with tender chicken pieces", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&auto=format&fit=crop&q=80" },
        { id: 36, name: "Veg Ramen", price: 250, description: "Japanese ramen with fresh vegetables", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80" }
      ],
      appetizers: [
        { id: 41, name: "Veg Momos", price: 140, description: "Steamed dumplings with vegetable filling", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&auto=format&fit=crop&q=80" },
        { id: 42, name: "Chilli Paneer", price: 200, description: "Indo-Chinese cottage cheese in spicy sauce", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 5,
    name: "Spice Symphony",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "40-50 min",
    wasteReduction: "80%",
    tags: ["Spicy", "Authentic", "Traditional"],
    menu: {
      appetizers: [
        { id: 43, name: "Vegetable Pakoras", price: 100, description: "Mixed vegetable fritters with mint chutney", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&auto=format&fit=crop&q=80" },
        { id: 44, name: "Paneer 65", price: 180, description: "Spicy fried cottage cheese cubes", image: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=400&auto=format&fit=crop&q=80" }
      ],
      curries: [
        { id: 46, name: "Kadai Paneer", price: 240, description: "Cottage cheese in spicy tomato gravy", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&auto=format&fit=crop&q=80" },
        { id: 47, name: "Malai Kofta", price: 260, description: "Vegetable balls in creamy tomato sauce", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80" },
        { id: 48, name: "Baingan Bharta", price: 200, description: "Smoky roasted eggplant curry", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80" }
      ],
      breads: [
        { id: 49, name: "Butter Naan", price: 60, description: "Soft bread brushed with butter", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&auto=format&fit=crop&q=80" },
        { id: 50, name: "Tandoori Roti", price: 50, description: "Whole wheat bread from tandoor", image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 6,
    name: "Hyderabadi Biryani House",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d49a?w=500&auto=format&fit=crop&q=60",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-45 min",
    wasteReduction: "88%",
    tags: ["Biryani", "Hyderabadi", "Royal"],
    menu: {
      biryani: [
        { id: 53, name: "Chicken Dum Biryani", price: 350, description: "Traditional Hyderabadi chicken biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d49a?w=400&auto=format&fit=crop&q=80" },
        { id: 54, name: "Mutton Dum Biryani", price: 450, description: "Royal mutton biryani with aromatic spices", image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&auto=format&fit=crop&q=80" },
        { id: 55, name: "Veg Dum Biryani", price: 280, description: "Vegetarian biryani with mixed vegetables", image: "https://images.unsplash.com/photo-1564759224907-65b945e60a66?w=400&auto=format&fit=crop&q=80" },
        { id: 56, name: "Fish Biryani", price: 380, description: "Coastal fish biryani with special spices", image: "https://images.unsplash.com/photo-1563379091339-03246963d49a?w=400&auto=format&fit=crop&q=80" }
      ],
      kebabs: [
        { id: 57, name: "Galouti Kebab", price: 300, description: "Melt-in-mouth mutton kebabs", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop&q=80" },
        { id: 58, name: "Shami Kebab", price: 250, description: "Soft minced meat kebabs", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop&q=80" },
        { id: 59, name: "Chicken Seekh", price: 280, description: "Spiced chicken skewers", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop&q=80" }
      ],
      accompaniments: [
        { id: 60, name: "Raita", price: 80, description: "Cooling yogurt with cucumber and mint", image: "https://images.unsplash.com/photo-1571201565936-1159bd2d17e2?w=400&auto=format&fit=crop&q=80" },
        { id: 61, name: "Shorba", price: 120, description: "Traditional mutton soup", image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&auto=format&fit=crop&q=80" },
        { id: 62, name: "Pickle", price: 40, description: "Homemade mixed pickle", image: "https://images.unsplash.com/photo-1626776877865-9cf2ec8e76d5?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 7,
    name: "Pizza Corner",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "15-25 min",
    wasteReduction: "83%",
    tags: ["Pizza", "Italian", "Fast Food"],
    menu: {
      pizzas: [
        { id: 63, name: "Margherita Pizza", price: 200, description: "Classic pizza with tomato sauce and mozzarella", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=80" },
        { id: 64, name: "Pepperoni Pizza", price: 280, description: "Pizza topped with spicy pepperoni", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80" },
        { id: 65, name: "Vegetarian Supreme", price: 320, description: "Loaded with fresh vegetables and cheese", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&auto=format&fit=crop&q=80" },
        { id: 66, name: "Chicken BBQ Pizza", price: 350, description: "BBQ chicken with onions and bell peppers", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop&q=80" }
      ],
      sides: [
        { id: 67, name: "Garlic Bread", price: 100, description: "Toasted bread with garlic butter", image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&auto=format&fit=crop&q=80" },
        { id: 69, name: "Chicken Wings", price: 200, description: "Spicy buffalo chicken wings", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&auto=format&fit=crop&q=80" }
      ],
      beverages: [
        { id: 70, name: "Cold Drink", price: 50, description: "Chilled soft drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&auto=format&fit=crop&q=80" },
        { id: 71, name: "Fresh Juice", price: 80, description: "Fresh fruit juices", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 8,
    name: "Rajasthani Rasoi",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60",
    cuisine: "Indian",
    rating: 4.9,
    deliveryTime: "25-35 min",
    wasteReduction: "89%",
    tags: ["Rajasthani", "Traditional", "Vegetarian"],
    menu: {
      thali: [
        { id: 72, name: "Rajasthani Thali", price: 400, description: "Traditional Rajasthani platter with dal, sabzi, roti, rice, and dessert", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&auto=format&fit=crop&q=80" },
        { id: 73, name: "Royal Thali", price: 500, description: "Premium thali with special Rajasthani delicacies", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&auto=format&fit=crop&q=80" }
      ],
      curries: [
        { id: 74, name: "Dal Baati Churma", price: 280, description: "Traditional Rajasthani dal with baked wheat balls", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&auto=format&fit=crop&q=80" },
        { id: 75, name: "Gatte Ki Sabzi", price: 220, description: "Gram flour dumplings in spiced yogurt curry", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=80" },
        { id: 76, name: "Ker Sangri", price: 250, description: "Traditional desert beans and berries curry", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80" }
      ],
      breads: [
        { id: 77, name: "Bajra Roti", price: 40, description: "Pearl millet flatbread", image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&auto=format&fit=crop&q=80" },
        { id: 78, name: "Makki Roti", price: 45, description: "Corn flour flatbread", image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=400&auto=format&fit=crop&q=80" }
      ],
      desserts: [
        { id: 79, name: "Ghevar", price: 120, description: "Traditional Rajasthani sweet disc", image: "https://images.unsplash.com/photo-1606471710834-7e0c4dc2d362?w=400&auto=format&fit=crop&q=80" },
        { id: 80, name: "Malpua", price: 100, description: "Sweet pancakes in sugar syrup", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  },
  {
    id: 9,
    name: "Chennai Express",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&auto=format&fit=crop&q=60",
    cuisine: "South Indian",
    rating: 4.7,
    deliveryTime: "20-30 min",
    wasteReduction: "91%",
    tags: ["South Indian", "Dosa", "Authentic"],
    menu: {
      dosas: [
        { id: 81, name: "Plain Dosa", price: 120, description: "Crispy rice and lentil crepe", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&auto=format&fit=crop&q=80" },
        { id: 82, name: "Masala Dosa", price: 150, description: "Dosa stuffed with spiced potato filling", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&auto=format&fit=crop&q=80" },
        { id: 83, name: "Rava Dosa", price: 160, description: "Semolina crepe with onions and chilies", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&auto=format&fit=crop&q=80" },
        { id: 84, name: "Cheese Dosa", price: 180, description: "Dosa filled with cheese and vegetables", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&auto=format&fit=crop&q=80" }
      ],
      idli_vada: [
        { id: 85, name: "Idli (4 pieces)", price: 80, description: "Steamed rice cakes with sambar and chutney", image: "https://images.unsplash.com/photo-1626840947440-151082c31ddd?w=400&auto=format&fit=crop&q=80" },
        { id: 86, name: "Medu Vada (3 pieces)", price: 100, description: "Crispy lentil donuts with sambar", image: "https://images.unsplash.com/photo-1626776877865-9cf2ec8e76d5?w=400&auto=format&fit=crop&q=80" },
        { id: 87, name: "Idli Vada Combo", price: 130, description: "2 idlis and 1 vada with sambar and chutney", image: "https://images.unsplash.com/photo-1626840947440-151082c31ddd?w=400&auto=format&fit=crop&q=80" }
      ],
      rice: [
        { id: 88, name: "Sambar Rice", price: 140, description: "Rice with lentil and vegetable curry", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80" },
        { id: 89, name: "Curd Rice", price: 120, description: "Rice mixed with yogurt and tempered spices", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80" },
        { id: 90, name: "Lemon Rice", price: 130, description: "Tangy rice with lemon and curry leaves", image: "https://images.unsplash.com/photo-1600326846416-e1d7bd4f3467?w=400&auto=format&fit=crop&q=80" }
      ],
      beverages: [
        { id: 91, name: "Filter Coffee", price: 50, description: "Traditional South Indian coffee", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e76?w=400&auto=format&fit=crop&q=80" },
        { id: 92, name: "Buttermilk", price: 40, description: "Spiced yogurt drink", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80" }
      ]
    }
  }
];

export default enhancedRestaurants;
