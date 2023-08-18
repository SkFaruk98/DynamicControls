sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project1.controller.App", {
        onInit() {
    //       let oTable=new Table({
    //         visible:"true",
    //     columns:{
    //         path:'eduModel>/TableHeading',
    //         factory:(sCollndex, oColContext)=>{
    //             return new sap.m.Column({
    //                 header:new sap.m.Text({
    //                     text:oColContext.getObject().label
    //                 })
    //             })
    //         }
    //     },
    //     items:{
    //         path:'eduModel>/education', 
    //         factory:(oCollindex,oRowContext)=>{
    //             return new sap.m.ColumnListItem({
    //                 cells:[
    //                     new sap.m.Text({
    //                         text:`{eduModel>${oRowContext}/course}`,
    //                     }),
    //                     new sap.m.Text({
    //                         text:`{eduModel>${oRowContext}/institution}`,
    //                     }),
    //                     new sap.m.Text({
    //                         text:`{eduModel>${oRowContext}/yop}`,
    //                     }),
    //                      new sap.m.Text({
    //                         text:`{eduModel>${oRowContext}/aggregation}`,
    //                     })

    //                 ]
    //             })
    //         }
    //     }

    //  })

       
    //    oPage.addContent(oTable)
        }
      });
    }
  );
  