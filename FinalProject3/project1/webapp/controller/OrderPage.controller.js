sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.OrderPage", {
            onInit: function () {
                this.topOrderChart()
                this.deliveredAndProcessingChart()
                this.catogeryChart()
                this.itemTotalAmountCal()
                this.order_TotalAmount_numberOfItem_Cal()

                //page id
                this.oPage = this.byId("page")
            },

            columnsHeading(oIndex, oContext) {
                return new sap.m.Column({
                    header: new sap.m.Text({
                        text: oContext.getObject().label,
                    })
                })
            },
            itemsData(oIndex, oContext) {
                let status = oContext.getObject().status
                let sState = status == "Delivered" ? "Success" : "Error";
                let currency = " ₹"
                return new sap.m.ColumnListItem({
                    type: "Active",
                    cells: [
                        new sap.m.Text({ text: oContext.getObject().orderId }),
                        new sap.m.Text({ text: oContext.getObject().orderDate }),
                        new sap.m.Text({ text: oContext.getObject().numberOfItems }),
                        new sap.m.ObjectStatus({ text: oContext.getObject().status, state: sState }),
                        new sap.m.Text({ text: oContext.getObject().customerName }),
                        new sap.m.Text({ text: oContext.getObject().amount + currency }),
                        new sap.m.Text({ text: oContext.getObject().paymentType })
                    ],
                })
            },



            onDialog: function (content, title, saveFunction) {
                let addButton= saveFunction=="onSave"? true:false;
                this.oDialog = new sap.m.Dialog({
                    draggable: true,
                    resizeble: true,
                    title: title,
                    contentHeight: "200px",

                    buttons: [
                        new sap.m.Button({
                            text: "Ok",
                            type: "Emphasized",
                            press: () => {
                                if (saveFunction == "Sort")
                                    this.onClickOkSort();
                                else if (saveFunction == "filter")
                                    this.onFilter();
                                else if (saveFunction == "onSave")
                                this.onSaveOrder();
                            }
                        }),
                        new sap.m.Button({
                            text: "Cancel",
                            type: "Reject",
                            press: () => {
                                this.oDialog.close()
                            }
                        }),
                        new sap.m.Button({
                            text: "Add Order",
                            type: "Transparent",
                            icon:"sap-icon://add",
                            visible:addButton,
                            press: () => {
                                this.onAddOrder()
                            }
                        })
                    ]
                });

                this.oDialog.addContent(content);
                this.oPage.addDependent(this.oDialog);
                this.oDialog.open();

            },
            //For Sorting

            //on Click on Sort button
            onClickSort: function () {
                let cGrouping = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/groupingButton")
                let oGrid = new sap.ui.layout.Grid({ height: "200px" });
                let oLabel1 = new sap.m.Label({ text: "" });
                let oLabel = new sap.m.Label({ text: "Select The Column To Sort" })
                let oVbox = new sap.ui.layout.VerticalLayout({ width: "550px" })
                let oButton1 = new sap.m.Button({
                    text: "ascending",
                    icon: 'sap-icon://arrow-top',
                    type: "Transparent",
                    press: () => {
                        this.getView().getModel("saleOrderModel").setProperty("/ascendingOrDescending", false)
                    }
                });
                let oButton2 = new sap.m.Button({
                    text: "descending",
                    icon: 'sap-icon://arrow-bottom',
                    type: "Transparent",
                    press: () => {
                        this.getView().getModel("saleOrderModel").setProperty("/ascendingOrDescending", true)
                    }

                });
                let oButton3 = new sap.m.Button({
                    text: "Grouping",
                    icon: 'sap-icon://arrow-bottom',
                    type: "Transparent",
                    visible: cGrouping,
                    press: () => {
                        this.getView().getModel("saleOrderModel").setProperty("/grouping", true)
                    }
                })

                let oToolbar = new sap.m.Toolbar({})
                let oComboBox = new sap.m.ComboBox({
                    change: (oEvent) => {
                        this.Valueof(oEvent)
                    },
                    items: {
                        path: 'saleOrderModel>/labels',
                        factory: (oIndex, oContext) => {
                            return new sap.ui.core.Item({
                                text: oContext.getObject().label
                            })
                        }
                    },
                })

                oVbox.addContent(oLabel1);
                oVbox.addContent(oLabel);
                oToolbar.addContent(oComboBox);
                oToolbar.addContent(oButton1);
                oToolbar.addContent(oButton2);

                if (cGrouping)
                    oToolbar.addContent(oButton3)

                oVbox.addContent(oToolbar);
                oGrid.addContent(oVbox)
                let title = "Sort";
                this.onDialog(oGrid, title, title)

            },

            //To Get the Selected value in Combo Box
            Valueof: function (oEvent) {
                let sValue = oEvent.getSource().getValue();
                let aValue = sValue.split(" ");
                let colm = "";
                aValue.forEach(val => {
                    colm += val;
                })
                this.getView().getModel("saleOrderModel").setProperty("/Column", colm);
            },

            //Sort Function on click on Ok in Dialog
            onClickOkSort: function () {
                let cGroupingSort = this.getView().getModel("saleOrderModel").getProperty("/grouping")
                let sColumn = this.getView().getModel("saleOrderModel").getProperty("/Column");
                let ascendingOrDesceding = this.getView().getModel("saleOrderModel").getProperty("/ascendingOrDescending");
                let oTable = this.byId("orderTable").getBinding("items");
                let sorter = [new sap.ui.model.Sorter(sColumn, ascendingOrDesceding, cGroupingSort)];
                oTable.sort(sorter);
                this.oDialog.close()
            },

            //On Clcik Group Button Dialog open
            onClickGroup: function () {
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/groupingButton", true)
                this.onClickSort()
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/groupingButton", false)

            },

            //on Click Filter Button Dialog Open
            onClickOnFilterButton: function () {
                let oToolbar = new sap.m.Toolbar({ width: "640px" });

                let oComboBox = new sap.m.ComboBox({
                    placeholder: "Select Column",
                    change: (oEvent) => {
                        this.Valueof(oEvent)
                    },
                    items: {
                        path: 'saleOrderModel>/labels',
                        factory: (oIndex, oContext) => {
                            return new sap.ui.core.Item({
                                text: oContext.getObject().label
                            })
                        }
                    },
                });

                let oComboBox1 = new sap.m.ComboBox({
                    placeholder: "operator",
                    change: (oEvent) => {
                        let sOperator = oEvent.getSource().getValue();
                        this.getView().getModel("saleOrderModel").setProperty("/operator", sOperator);
                    },
                    items: {
                        path: 'saleOrderModel>/operators',
                        factory: (oIndex, oContext) => {
                            return new sap.ui.core.Item({
                                text: oContext.getObject().operator
                            })
                        }
                    },
                });

                let oInput = new sap.m.Input({
                    width: "100px", placeholder: "value1",
                    liveChange: (oEvent) => {
                        let value1 = oEvent.getSource().getValue();
                        this.getView().getModel("saleOrderModel").setProperty("/value1", value1);

                    }
                });
                let oInput1 = new sap.m.Input({
                    width: "100px", placeholder: "value2",
                    liveChange: (oEvent) => {
                        let value2 = oEvent.getSource().getValue();
                        this.getView().getModel("saleOrderModel").setProperty("/value2", value2);
                    }
                });
                oToolbar.addContent(oComboBox)
                oToolbar.addContent(oComboBox1)
                oToolbar.addContent(oInput)
                oToolbar.addContent(oInput1)
                let title = "Filter"
                let saveFunction = "filter";
                this.onDialog(oToolbar, title, saveFunction)
            },

            //Filter Function on clicking ok in Dialog
            onFilter: function () {
                let mPath = this.getView().getModel("saleOrderModel")

                let sColumn = mPath.getProperty("/Column");
                let sOperator = mPath.getProperty("/operator")
                let value1 = mPath.getProperty("/value1")
                let value2 = mPath.getProperty("/value2")

                let oTable = this.byId("orderTable").getBinding("items")
                let oFilter = new sap.ui.model.Filter(sColumn, sOperator, value1, value2);

                oTable.filter(oFilter);
                this.oDialog.close()
            },

            itemTotalAmountCal: function () {
                let aItems = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/items");
                aItems.forEach((item, index) => {
                    item.TotalAmount = (item.quantity * item.singleUnitAmount)
                    this.getOwnerComponent().getModel("saleOrderModel").setProperty("/items/" + index + "/TotalAmount", item.TotalAmount);

                })
            },

            order_TotalAmount_numberOfItem_Cal: function () {
                let aOrders = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/orders");
                let aItems = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/items");
                let count = 0;

                aOrders.forEach((order, index) => {
                    let amountOfOrder = 0;
                    let itemCount = 0;
                    for (let i = count; i < aItems.length; i++) {
                        if (order.orderId == aItems[i].orderId) {
                            count++;
                            itemCount++
                            amountOfOrder += aItems[i].TotalAmount
                        }
                        else
                            break;
                    }
                    order.amount = amountOfOrder;
                    order.numberOfItems = itemCount
                    this.getOwnerComponent().getModel("saleOrderModel").setProperty("/order/" + index + "/amount", order.amount);
                    this.getOwnerComponent().getModel("saleOrderModel").setProperty("/order/" + index + "/numberOfItems", order.numberOfItems);
                })

            },
            topOrderChart: function () {
                let aCustomers = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/customers");
                let aOrders = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/orders");
                let dupArrOrders = [...aOrders]
                let newAcutomers = dupArrOrders.sort((a, b) => { return a.customerId - b.customerId })
                let count = 0;
                let max = 0, secMax = 0;
                let oFirstTop = {}, oSecondTop = {};
                aCustomers.forEach(customer => {
                    let eachCount = 0;
                    for (let i = count; i < newAcutomers.length; i++) {
                        if (customer.customerId == newAcutomers[i].customerId) {
                            count++;
                            eachCount++;
                            if (i == newAcutomers.length - 1 && eachCount >= max) {
                                secMax = max;
                                max = eachCount;
                                oSecondTop = oFirstTop;
                                oFirstTop = { name: newAcutomers[i - 1].customerName, count: eachCount }
                            }
                        }
                        else {
                            if (eachCount >= max) {
                                secMax = max;
                                max = eachCount;
                                oSecondTop = oFirstTop;
                                oFirstTop = { name: newAcutomers[i - 1].customerName, count: eachCount }
                            }
                            break;
                        }
                    }
                });
                let remaining = aOrders.length - (max + secMax);
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/first", oFirstTop);
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/second", oSecondTop);
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/other", remaining);
            },



            deliveredAndProcessingChart: function () {
                let aOrders = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/orders");
                let deliverCount = 0;
                let processCount = 0;
                aOrders.forEach(order => {
                    if (order.status == "Delivered")
                        deliverCount++;
                    else
                        processCount++;
                })
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/delivery/deliveryCount", deliverCount);
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/delivery/processCount", processCount);
            },

            catogeryChart: function () {
                let aItems = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/items");
                let electronicCount = 0;
                let fashionCount = 0;
                let foodCount = 0;
                let toyCount = 0;
                let aCatogery = [];
                aItems.forEach(item => {
                    switch (item.catogery) {
                        case "Electronics": electronicCount++;
                            break;
                        case "Fashion": fashionCount ++;
                            break;
                        case "Food": foodCount ++;
                            break;
                        case "Toys": toyCount ++;
                            break;
                    }
                })
                aCatogery.push({ name: "Electronic", count: electronicCount },
                    { name: "Fashion", count: fashionCount },
                    { name: "Food", count: foodCount },
                    { name: "Toy", count: toyCount }
                )
                aCatogery.sort((a, b) => { return b.count - a.count })
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/catogery", aCatogery);
            },
            onPressItem: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View2")
                this.byId("orderTable").removeSelections()
            },

            onSelect: function () {
                let aSelect = this.byId("orderTable").getSelectedItems()
                if (aSelect.length != 0)
                    this.getOwnerComponent().getModel("saleOrderModel").setProperty("/buttonToggle", true);
                else
                    this.getOwnerComponent().getModel("saleOrderModel").setProperty("/buttonToggle", false);
            },

            onCreate: function () {

                let oTable = new sap.m.Table({
                    columns: {
                        path: 'saleOrderModel>/labels',
                        factory:(oIndex, oContext)=>{
                            return new sap.m.Column({
                                header: new sap.m.Text({
                                    text: oContext.getObject().label,
                                })
                            })
                        }
                    },

                    items: {
                        path: 'saleOrderModel>/input',
                        factory: (oColInx, oRowCtx) => {
                            let pathof=oRowCtx.getPath
                            return new sap.m.ColumnListItem({
                                cells: [
                                  new sap.m.Input({ placeholder:"order Id", value:`{saleOrderModel>${oRowCtx.getPath()}/orderId}`}),
                                  new sap.m.Input({ placeholder:"order Date", value:`{saleOrderModel>${oRowCtx.getPath()}/orderDate}`}),
                                  new sap.m.Input({ placeholder:"number Of Items", value:`{saleOrderModel>${oRowCtx.getPath()}/numberOfItems}`}),
                                  new sap.m.Input({ placeholder:"status", value:`{saleOrderModel>${oRowCtx.getPath()}/status}`}),
                                  new sap.m.Input({ placeholder:"customer Name", value:`{saleOrderModel>${oRowCtx.getPath()}/customerName}`}),
                                  new sap.m.Input({ placeholder:"amount", value:`{saleOrderModel>${oRowCtx.getPath()}/amount}`}),
                                  new sap.m.Input({ placeholder:"paymentType", value:`{saleOrderModel>${oRowCtx.getPath()}/paymentType}`})
                                ]      
                            });
                        }
                    }

                });

                  const title="Fill The Order";
                  const saveFunction="onSave"
                  this.onDialog(oTable,title,saveFunction);

            },

            onSaveOrder:function(){
                const aInputs= this.getOwnerComponent().getModel("saleOrderModel").getProperty("/input");
                let aOrders=  this.getOwnerComponent().getModel("saleOrderModel").getProperty("/orders");
                aInputs.forEach(order=>{
                let oInput={...order}
                aOrders.push(oInput)
                })
             
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/orders",aOrders)
                this.oDialog.close();

            },

            onAddOrder:function(){
                const aInputs= this.getOwnerComponent().getModel("saleOrderModel").getProperty("/input");
                aInputs.push({ customerId:"" , orderId: "", orderDate: "", numberOfItems: "", status: "",customerName: "", amount: "",  paymentType: "" })
                this.getOwnerComponent().getModel("saleOrderModel").setProperty("/input",aInputs)
            },
            onDelete:function(){
                const oSelecetedOrders=this.byId("orderTable").getSelectedItems();
                const aItems = this.getOwnerComponent().getModel("saleOrderModel").getProperty("/items");
                const aOrders= this.getOwnerComponent().getModel("saleOrderModel").getProperty("/orders")
                const aSelectedIds=[]
                oSelecetedOrders.forEach(oSelecetedOrder=>{
                   let iOrderId= oSelecetedOrder.getBindingContext("saleOrderModel").getObject().orderId;
                   aSelectedIds.push(iOrderId);
                });
                let aSortedItems=[...aItems];
                let aSortedOrders=[...aOrders]
                aSelectedIds.sort((a,b)=>{return b-a});
                aSortedOrders.sort((a,b)=>{return a.orderId-b.orderId});
                aSortedItems.sort((a,b)=>{return a.orderId-b.orderId});
                let nTotaCountIt=0;
                let nTotaCountOd=0;
                let nCount1=0,nCount2=0;

                aSelectedIds.forEach(oSelectedIt=>{
                    nCount1=nTotaCountIt;
                      for(let i=(aSortedItems.length-1)-nCount1;i>=0;i--){
                        if(oSelectedIt==aSortedItems[i].orderId){
                            break;
                        }
                        nTotaCountIt++;
                      }
                      nCount2=nTotaCountIt;
                      for(let i=(aSortedItems.length-1)-nCount2;i>=0;i--){
                        if(oSelectedIt==aSortedItems[i].orderId){
                            aSortedItems.splice(i,1);
                        }
                        else
                        break;
                      }
                       
                         nCount2=nTotaCountOd
                       for(let i=(aSortedOrders.length-1)-nCount2;i>=0;i--){
                        if(oSelectedIt==aSortedOrders[i].orderId){
                            aSortedOrders.splice(i,1);
    
                            break;
                        }
                        nTotaCountOd++;
                       }

                   })
                   this.getOwnerComponent().getModel("saleOrderModel").setProperty("/items",aSortedItems)
                   this.getOwnerComponent().getModel("saleOrderModel").setProperty("/orders",aSortedOrders)

                   this.byId("orderTable").removeSelections()

                   this.topOrderChart()
                   this.deliveredAndProcessingChart()
                   this.catogeryChart()
                   this.itemTotalAmountCal()
                   this.order_TotalAmount_numberOfItem_Cal()
             }

        });
    });
