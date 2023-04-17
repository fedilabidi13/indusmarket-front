import {Component, OnInit} from '@angular/core';
import {Shop} from "../../models/shop";
import {Product} from "../../models/product";
import {ShowShopsService} from "../../_services/show-shop.service";
import {ShowProductsShopService} from "../../_services/show-products-shop.service";
import {Params} from "@angular/router";

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit{
  constructor(private product:ShowProductsShopService) {
  }
  public products: Product[]=[];
  id:any;
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  delete(){
    this.product.deleteProduct(this.id).subscribe();
    window.location.reload();
  }
  getId(id:any){
    this.id=id;
  }

  ngOnInit(): void {


    this.product.getProd()
       }

}
