
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { roluser } from "../../../models/roluser";

    export const fetchUserRoles = async (uid: string) => {
      try {
        const queryRolUser = query(collection(db, "roluser"), where("user_id", "==", uid));

        if(!queryRolUser) {
          throw new Error("No se pudo obtener el rol del usuario");         
        }
        const querySnapshot = (await getDocs(queryRolUser));
        const rolesList: roluser[] = [];

        querySnapshot.forEach((doc) => {
          rolesList.push(
            {
              id: doc.id,
              rol_id: doc.data().user_id,
              rol: doc.data().rol,
            } as roluser
          );
        });
        
        return rolesList;
      } catch (error: any) {
        console.error("Error fetching user roles: ", error);
        return [];
      }
    };
 

    
    export const fetchUserRole = async (uid: string) : Promise<roluser> =>{

      if (!uid) {
        throw new Error("UID no proporcionado");
      }

      const queryRolUser = query(
        collection(db, "roluser"),
        where("user_id", "==", uid)
      );
    
      const querySnapshot = await getDocs(queryRolUser);
    
      if (querySnapshot.empty) {
        throw new Error("No se encontraron roles para el usuario");
      }
    
      const firstDoc = querySnapshot.docs[0];
    
      const rolUsuario: roluser = {
        id: firstDoc.id,
        rol_id: firstDoc.data().user_id,
        rol: firstDoc.data().rol || "user", 
      };
        
        return rolUsuario;        
      
    };