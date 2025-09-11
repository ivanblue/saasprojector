import { useState, useEffect } from 'react';
import { ProjectionInputs, ProjectionDataPoint } from '@/types';

export const useProjection = (inputs: ProjectionInputs): ProjectionDataPoint[] => {
  const [data, setData] = useState<ProjectionDataPoint[]>([]);

  useEffect(() => {
    const { initialCustomers, initialMrr, arpu, monthlyGrowthRate, churnRate, projectionMonths } = inputs;

    const calculateProjection = () => {
      const projection: ProjectionDataPoint[] = [];
      const growthFactor = monthlyGrowthRate / 100;
      const churnFactor = churnRate / 100;

      let currentCustomers = initialCustomers;
      let currentMrr = initialMrr;

      for (let i = 1; i <= projectionMonths; i++) {
        const startingCustomers = currentCustomers;

        const newCustomers = Math.round(startingCustomers * growthFactor);
        const lostCustomers = Math.round(startingCustomers * churnFactor);

        const endingCustomers = startingCustomers + newCustomers - lostCustomers;

        // calculate MRR based on the change in customers from the previous month
        // this ensures initialMrr is properly used as the starting point
        const customerChange = endingCustomers - startingCustomers;
        const mrrChange = customerChange * arpu;
        const mrr = currentMrr + mrrChange;
        const arr = mrr * 12;

        projection.push({
          month: i,
          startingCustomers: Math.round(startingCustomers),
          newCustomers,
          lostCustomers,
          endingCustomers: Math.round(endingCustomers),
          mrr,
          arr,
        });

        currentCustomers = endingCustomers;
        currentMrr = mrr;
      }
      setData(projection);
    };

    calculateProjection();
  }, [inputs]);

  return data;
};
