export interface ProjectionInputs {
  initialCustomers: number;
  initialMrr: number;
  arpu: number;
  monthlyGrowthRate: number;
  churnRate: number;
  projectionMonths: number;
}

export interface ProjectionDataPoint {
  month: number;
  startingCustomers: number;
  newCustomers: number;
  lostCustomers: number;
  endingCustomers: number;
  mrr: number;
  arr: number;
}
