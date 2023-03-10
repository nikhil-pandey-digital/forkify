// the goal of the module is to contain functions that we reuse over and over in our project

import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  

export const getJSON =async function(url){
    try {
        const res = await Promise.race([fetch(`${url}`),timeout(TIMEOUT_SEC)]); 
        
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        
        const data = await res.json();
        
        
        return data;
    } catch (error) {
         throw error;
    }
} ;