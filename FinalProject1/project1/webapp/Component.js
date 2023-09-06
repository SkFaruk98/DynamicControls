/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "project1/model/models"
],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("project1.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                const orderModel = new sap.ui.model.json.JSONModel({
         customers: [
                    { customerId: 1001, customerName: "Mani", phoneNumber: 7689459034, address: "PattiPadu,Guntur,AP-522003", email: "mani123@gmail.com" },
                    { customerId: 1002, customerName: "Sai", phoneNumber: 7689459034, address: "PattiPadu,Guntur,AP-522003", email: "mani123@gmail.com" },
                    { customerId: 1003, customerName: "Faruk", phoneNumber: 7689459034, address: "PattiPadu,Guntur,AP-522003", email: "mani123@gmail.com" },
                    { customerId: 1004, customerName: "Teja", phoneNumber: 7689459034, address: "PattiPadu,Guntur,AP-522003", email: "mani123@gmail.com" }],
         orders: [
                    { customerId:1001 , orderId: 1, orderDate:  "25-8-2012", numberOfItems: 3, status: "Delivered",  customerName: "Mani", amount: 6500,  paymentType: "online" },
                    { customerId:1002 , orderId: 2, orderDate:  "05-9-2012", numberOfItems: 5, status: "Processing", customerName: "Sai", amount: 8500,   paymentType: "Cash on Delivery" },
                    { customerId:1004 , orderId: 3, orderDate:  "05-9-2012", numberOfItems: 2, status: "Processing", customerName: "Teja", amount: 7500,  paymentType: "Cash on Delivery" },
                    { customerId:1001 , orderId: 4, orderDate:  "10-8-2012", numberOfItems: 1, status: "Delivered", customerName: "Mani", amount: 10500,  paymentType: "online" },
                    { customerId:1003 , orderId: 5, orderDate:  "11-8-2012", numberOfItems: 2, status: "Delivered",  customerName: "Faruk", amount: 4506, paymentType: "Cash on Delivery" },
                    { customerId:1004 , orderId: 6, orderDate:  "03-9-2012", numberOfItems: 1, status: "Processing", customerName: "Teja", amount: 2500,  paymentType: "online" },
                    { customerId:1002 , orderId: 7, orderDate:  "26-9-2012", numberOfItems: 3, status: "Processing", customerName: "Sai", amount: 1200,   paymentType: "Cash on Delivery" },
                    { customerId:1004 , orderId: 8, orderDate:  "29-9-2012", numberOfItems: 1, status: "Delivered", customerName: "Teja", amount: 8500,   paymentType: "Cash on Delivery" },
                    { customerId:1004 , orderId: 9, orderDate:  "01-10-2012", numberOfItems: 2, status: "Processing", customerName: "Teja", amount: 1200, paymentType: "online" },
                    { customerId:1001 , orderId: 10, orderDate: "05-10-2012", numberOfItems: 1, status: "Processing",customerName: "Mani", amount: 4590,  paymentType: "online" },
                    
                ],
         items:[
                   {customerId: 1001, orderId:1, itemName:"Trousers", catogery:"Fashion", quantity:1, singleUnitAmount:1400, TotalAmount:0},
                   {customerId: 1001, orderId:1, itemName:"Remote Control Car", catogery:"Toys", quantity:2, singleUnitAmount:800, TotalAmount:0},
                   {customerId: 1001, orderId:1, itemName:"Air Conditioner", catogery:"Electronics", quantity:1, singleUnitAmount:50000, TotalAmount:0},

                   {customerId: 1002, orderId:2, itemName:"Wireless Bluetooth Earphones", catogery:"Electronics", quantity:1, singleUnitAmount:2000, TotalAmount:0},
                   {customerId: 1002, orderId:2, itemName:"Shoes", catogery:"Fashion", quantity:2, singleUnitAmount:300, TotalAmount:0},
                   {customerId: 1002, orderId:2, itemName:"Cooked Oil 5 ltr's", catogery:"Food", quantity:1, singleUnitAmount:550, TotalAmount:0},
                   {customerId: 1002, orderId:2, itemName:"Jeans Pant", catogery:"Fashion", quantity:3, singleUnitAmount:500, TotalAmount:0},
                   {customerId: 1002, orderId:2, itemName:"Ghee 500gm", catogery:"Food", quantity:2, singleUnitAmount:250, TotalAmount:0},

                   {customerId: 1004, orderId:3, itemName:"Dinasor Plastic Model", catogery:"Toys", quantity:2, singleUnitAmount:200, TotalAmount:0},
                   {customerId: 1004, orderId:3, itemName:"BeyBlade", catogery:"Toys", quantity:1, singleUnitAmount:150, TotalAmount:0},

                   {customerId: 1001, orderId:4, itemName:"Wheat Flour 10kg", catogery:"Food", quantity:1, singleUnitAmount:600, TotalAmount:0},

                   {customerId: 1003, orderId:5, itemName:"Bluetooth Sound Bar", catogery:"Electronics", quantity:1, singleUnitAmount:8000, TotalAmount:0},
                   {customerId: 1003, orderId:5, itemName:"TV 53 inches ", catogery:"Electronics", quantity:1, singleUnitAmount:48000, TotalAmount:0},

                   {customerId: 1004, orderId:6, itemName:"DSLR Lens", catogery:"Electronics", quantity:1, singleUnitAmount:22500, TotalAmount:0},

                   {customerId: 1002, orderId:7, itemName:"Hoody L size", catogery:"Fashion", quantity:1, singleUnitAmount:900, TotalAmount:0},
                   {customerId: 1002, orderId:7, itemName:"Mi Note Pro 10 max", catogery:"Electronics", quantity:1, singleUnitAmount:250, TotalAmount:0},
                   {customerId: 1002, orderId:7, itemName:"RayBon Cooling Glasses", catogery:"Fashion", quantity:1, singleUnitAmount:250, TotalAmount:0},

                   {customerId: 1004, orderId:8, itemName:"Remote Control Plane", catogery:"Toys", quantity:1, singleUnitAmount:1200, TotalAmount:0},

                   {customerId: 1004, orderId:9, itemName:"Black Grams 1kg", catogery:"Food", quantity:2, singleUnitAmount:160, TotalAmount:0},
                   {customerId: 1004, orderId:9, itemName:"Smart Watch ", catogery:"Electronics", quantity:1, singleUnitAmount:2500, TotalAmount:0},

                   {customerId: 1001, orderId:10, itemName:"Panjabi Dress", catogery:"Fashion", quantity:1, singleUnitAmount:500, TotalAmount:0},
           ],
         labels:[
                    {label:"orderId"},
                    {label:"order Date"},
                    {label:"number Of Items"},
                    {label:"status"},
                    {label:"customer Name"},
                    {label:"amount"},
                    {label:"payment Type"} ],

        operators:[
                    {operator:"LT"},
                    {operator:"GT"},
                    {operator:"BT"},
                    {operator:"EQ"},
                    {operator:"Contains"},
                    {operator:"NotContains"}   ],
         first:"",
         second:"",
         other:"",
         delivery:{deliveryCount:0,processCount:0},
         catogery:{},

         //For Sorting and Filtering
         Column:"",
         ascendingOrDescending:"",

         //For Filtering
         operator:"",
         value1:"",
         value2:"",
         groupingButton:false,
         grouping:false,
         
         buttonToggle:false,
                })



                this.setModel(orderModel, "saleOrderModel");
            },
       
        });
    }
);