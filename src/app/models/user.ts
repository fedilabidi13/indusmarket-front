import { Address } from "./adresse";
import { BanType } from "./enumerations/BanType";
import { Role } from "./enumerations/Role";
import { Media } from "./media";
import {ShoppingCart} from "./shoppingCart";

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    address!: Address ;
    role!: string ;
    enabled!: boolean;
    firstAttempt!: boolean;
    phoneNumber!: number;
    country!: string;
    banType!: BanType ;
    bannedAt!: string;
    twoFactoesAuth!: boolean;
    phoneNumberVerif!: boolean;
    emailVerif!:boolean;
    picture!:Media ;
    shoppingCart!: ShoppingCart ;


}
