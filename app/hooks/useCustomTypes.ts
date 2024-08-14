import { useAuth } from "@clerk/nextjs";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../utils/firebase";
import type { ConsumptionTypeType } from "../utils/firestoreStructure";

function useCustomTypes() {
  // This hooks serves as the Custom Types added by the user
  const [state, setState] = useState<string[]>([]);
  const { userId } = useAuth();
  const collectionPath = `users/${userId}/types`;

  useEffect(
    () =>
      onSnapshot(collection(firestore, collectionPath), (snapshot) => {
        if (!snapshot.empty) {
          const consumptionPlaceholder = [] as typeof state;
          snapshot.forEach((doc) => {
            const consumption = doc.data() as ConsumptionTypeType;
            consumptionPlaceholder.push(consumption.value);
          });
          setState(consumptionPlaceholder);
        }
      }),
    [userId, collectionPath]
  );

  return state;
}

export default useCustomTypes;
