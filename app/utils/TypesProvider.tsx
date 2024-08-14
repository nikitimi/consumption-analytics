"use client";

import React, { useContext, useEffect, useState, createContext } from "react";
import defaultTypes from "./defaultTypes";
import { useAuth } from "@clerk/nextjs";
import useCustomTypes from "../hooks/useCustomTypes";
import { firestore } from "./firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { ConsumptionTypeType } from "./firestoreStructure";

type TypesProviderType = {
  children: React.ReactNode;
};
type InitialStateType = {
  types: string[];
};
type TypesMethodType = {
  addType: (type: string) => Promise<void>;
};
type TypesContextType = InitialStateType & TypesMethodType;

const initialState: InitialStateType = {
  types: [],
};

const TypesContext = createContext<TypesContextType>({
  ...initialState,
  addType: async () => {},
});

const TypesProvider = (props: TypesProviderType) => {
  const { children } = props;
  const [{ types }, setState] = useState<InitialStateType>(initialState);
  const { userId } = useAuth();
  const consumptionTypes = useCustomTypes();
  const isAuthenticated = typeof userId === "string";

  useEffect(() => {
    // Fetch data in the Firestore database and push here
    const set = new Set([...defaultTypes, ...consumptionTypes]);
    return setState((prevState) => ({
      ...prevState,
      types: Array.from(set),
    }));
  }, [consumptionTypes]);

  async function addType(type: string) {
    // Check if user is Authenticated
    if (isAuthenticated) {
      // Add to Firestore
      const userDocRef = doc(firestore, "users", userId);
      const docResult = await getDoc(userDocRef);
      const consumptionType: ConsumptionTypeType = {
        value: type,
        dateCreated: new Date().getTime(),
      };

      const addTypesToFirestore = async () => {
        await addDoc(collection(userDocRef, "types"), consumptionType);
      };

      if (docResult.exists()) {
        try {
          await addTypesToFirestore();
          console.log(`✅ ${userId} exists! ${consumptionType.value} !`);
        } catch (err) {
          console.log(`❌ Adding ${consumptionType.value} !`);
        }
      } else {
        const documentInitialState = {
          dateCreated: new Date().getTime(),
        };
        try {
          await setDoc(doc(firestore, "user", userId), documentInitialState);
          const newDate = new Date();
          newDate.setTime(documentInitialState.dateCreated);
          console.log(`${userId} Created at ${newDate}!`);
        } catch (err) {
          console.log(`❌ Error in creating initial document state!`);
        }
        try {
          await addTypesToFirestore();
          console.log(`✅ ${consumptionType.value}!`);
        } catch (err) {
          console.log(`❌ Adding ${consumptionType.value}!`);
        }
      }
    }
    setState((prevState) => ({
      ...prevState,
      types: [...prevState.types, type],
    }));
  }

  const values: TypesContextType = { types, addType };

  return (
    <TypesContext.Provider value={values}>{children}</TypesContext.Provider>
  );
};

const useTypes = () => useContext(TypesContext);

export { useTypes };
export default TypesProvider;
