type IDType = {
  id: string;
};

type TimeStamp = {
  dateCreated: number;
};

type ConsumptionTypeType = {
  value: string;
} & TimeStamp;

type ProfileType = {
  name: string;
};

type ProfileUIDType = ProfileType & IDType;

type PriceValueType = {
  value: number;
  currency: "php";
};

type ConsumptionType = {
  type: string;
  description: string;
  price: PriceValueType;
} & TimeStamp;

type ConsumptionTypeWithID = ConsumptionType & IDType;

export type {
  IDType,
  ConsumptionTypeType,
  ProfileType,
  ProfileUIDType,
  ConsumptionType,
  ConsumptionTypeWithID,
};
