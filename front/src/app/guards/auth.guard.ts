import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("***GUARDS AUTH ACTIVADO")
  const router=inject(Router)

  const token = localStorage.getItem("access_token") || ""
  if(token.length>0){
    return true
  }
  else{
    router.navigate(["/auth/login"])
    return false;
  }
};
