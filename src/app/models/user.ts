import { Address } from "./adresse";
import { BanType } from "./enumerations/BanType";
import { Role } from "./enumerations/Role";
import { Media } from "./media";
import {Expose} from "class-transformer";
import {Type} from "@angular/core";

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

  twoFactorsAuth?: boolean;
    phoneNumberVerif!: any;

    emailVerif!:boolean;

    picture!:Media ;

}
