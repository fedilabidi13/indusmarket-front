import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ShowProductsShopService} from "../../_services/show-products-shop.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit{
  constructor(private product:ShowProductsShopService,private userService:UserService) {
  }
  public products: Product[]=[];
  id:any;
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user: number;
  selectedIndex =0;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  public indexImage:object={};
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

    this.user=this.userService.getCurrentUser().id;
    this.product.getProd(this.user).subscribe(data=>{this.products=data
    for (let product of this.products){
      this.indexImage[product.idProduct] = 0;}}
    )

       }

  selectImage(idImage:number,index: number):void{
    this.indexImage[idImage]=index;
  }

  onPrevClick(idImage: number,longeur:number):void{
    if(this.indexImage[idImage]===0){
    }else {
      this.indexImage[idImage]--;
    }
  }
  onNextClick(idImage:number,longeur:number ):void{
    if(this.indexImage[idImage] === longeur -1){
      this.indexImage[idImage] = 0;
    }else{
      this.indexImage[idImage]++;
    }
  }

}
