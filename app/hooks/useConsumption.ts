import { useAuth } from "@clerk/nextjs";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { ConsumptionType } from "../utils/firestoreStructure";
import { firestore } from "../utils/firebase";

function useConsumption() {
  const [state, setState] = useState<ConsumptionType[]>([]);
  const { userId } = useAuth();
  const collectionPath = `users/${userId}/consumptions`;

  useEffect(
    () =>
      onSnapshot(collection(firestore, collectionPath), (snapshot) => {
        if (!snapshot.empty) {
          const consumptionPlaceholder = [] as typeof state;
          snapshot.forEach((doc) => {
            const consumption = doc.data() as ConsumptionType;
            consumptionPlaceholder.push(consumption);
          });
          setState(consumptionPlaceholder);
        }
      }),
    [userId, collectionPath]
  );

  return state;
}

export default useConsumption;
