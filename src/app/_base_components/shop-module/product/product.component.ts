import {Component, Input, OnInit} from '@angular/core';
import {ShowShopsService} from "../../../_services/show-shop.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ShowProductsShopService} from "../../../_services/show-products-shop.service";

import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-prod',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  public productList:Product[]=[];
  p:number = 1;
  itemsPerPage:number =3;
  totalShop:any;
  selectedIndex =0;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  public indexImage:object={};
  constructor(private ac:ActivatedRoute,private api:ShowProductsShopService,private api1:ShowShopsService){}
  routeSub: Subscription;
  id:any;
  ngOnInit():void{
    console.log('hello')
    this.routeSub = this.ac.params.subscribe((params: Params) => {
      this.id = params['id'];

    });

    this.api.getProduct(this.id)
      .subscribe(res=>{
        this.productList = res;
        for(let shop of this.productList){

          this.indexImage[shop.idProduct]=0;
        }
        console.log(this.productList)
      })
    console.log('helloooooooooooooooooooooooooooo')
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
