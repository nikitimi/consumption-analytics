"use client";

import { useState } from "react";
import Main from "./components/Main";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTypes } from "./utils/TypesProvider";
import type { ConsumptionType } from "./utils/firestoreStructure";
import { EMPTY_STRING, EMPTY_INTEGER } from "@/app/utils/empty";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const initialState: ConsumptionType = {
  type: EMPTY_STRING,
  description: EMPTY_STRING,
  price: {
    value: EMPTY_INTEGER,
    currency: "php",
  },
  dateCreated: EMPTY_INTEGER,
};

export default function Home() {
  const { types, addType } = useTypes();
  const [state, setState] = useState(initialState);
  const [key, setKey] = useState(+new Date());
  const isAuthenticated = typeof useAuth().userId === "string";
  const router = useRouter();
  const descriptionInputId = "description";
  const priceValueInputId = "price-value";
  const clearButtonId = "clear";
  const submitButtonId = "submit";
  const selectPlaceholderValue = "Select a type";

  function validateState(): boolean {
    return (
      state.type === EMPTY_STRING ||
      state.description === EMPTY_STRING ||
      state.price.value === EMPTY_INTEGER
    );
  }

  function handleFormClick(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/login");
  }

  function handleTypeChange(type: string) {
    setState((prevState) => ({ ...prevState, type }));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget as HTMLInputElement;

    setState((prevState) => {
      if (input.id == priceValueInputId) {
        return {
          ...prevState,
          price: { ...prevState.price, value: parseInt(input.value, 10) },
        };
      }
      return { ...prevState, description: input.value };
    });
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget as HTMLButtonElement;

    setState((prevState) => {
      if (button.id === submitButtonId) {
        void addType(prevState.type);
      }

      // Resets the Form input FIelds
      [descriptionInputId, priceValueInputId].forEach(
        (id) =>
          ((document.getElementById(id) as HTMLInputElement).value =
            EMPTY_STRING)
      );
      // Resets the Select Field
      setKey(+new Date());

      return initialState;
    });
  }

  return (
    <Main>
      <Card className="w-max">
        <CardHeader>
          <CardTitle>Enter your consumption here</CardTitle>
          <CardDescription>Record your expenses!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onClick={handleFormClick}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="types">Types</Label>
                <Select
                  key={key}
                  onValueChange={handleTypeChange}
                  disabled={!isAuthenticated}
                >
                  <SelectTrigger id="types" className="capitalize">
                    <SelectValue placeholder={selectPlaceholderValue} />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    <SelectGroup className="capitalize">
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={descriptionInputId}>Description</Label>
                <Input
                  id={descriptionInputId}
                  placeholder="Enter your description here..."
                  onChange={handleInputChange}
                  disabled={!isAuthenticated}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={priceValueInputId}>Value</Label>
                <Input
                  id={priceValueInputId}
                  type="number"
                  placeholder="Enter price Value here"
                  onChange={handleInputChange}
                  disabled={!isAuthenticated}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            id={clearButtonId}
            variant="outline"
            onClick={handleButtonClick}
            disabled={!isAuthenticated}
          >
            Clear
          </Button>
          <Button
            id={submitButtonId}
            disabled={validateState() || !isAuthenticated}
            onClick={handleButtonClick}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Main>
  );
}
