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

        // MRR can be based on ending customers * ARPU or grown from initial MRR.
        // Let's use ending customers * ARPU for a more dynamic model.
        const mrr = endingCustomers * arpu;
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
