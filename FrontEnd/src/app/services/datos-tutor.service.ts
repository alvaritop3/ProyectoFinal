import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosTutorService {

  private _id_tutor!: number;
  private _email_tutor: string = "";
  private _nombre_tutor: string = "";

  public get id_tutor(): number {
    return this._id_tutor;
  }
  public set id_tutor(value: number) {
    this._id_tutor = value;
  }
  
  public get email_tutor(): string {
    return this._email_tutor;
  }
  public set email_tutor(value: string) {
    this._email_tutor = value;
  }
  
  public get nombre_tutor(): string {
    return this._nombre_tutor;
  }
  public set nombre_tutor(value: string) {
    this._nombre_tutor = value;
  }
  
  constructor() { }


}
