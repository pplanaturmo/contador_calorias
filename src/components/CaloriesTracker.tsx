import { useMemo } from "react";
import { Activity } from "../types";
import CaloriesDisplay from "./CaloriesDisplay";

type CaloriesTrackerProps = {
  activities: Activity[];
};

export default function CaloriesTracker({ activities }: CaloriesTrackerProps) {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesSpent = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(()=>caloriesConsumed - caloriesSpent, [activities])

  return (
    <>
      <h2 className="text-2xl font-black text-white text-center">
        Resumen de Calorías
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-around gap-5 mt-10">
        <CaloriesDisplay 
        calories={caloriesConsumed}
        text={"Consumidas"}
        />
         <CaloriesDisplay 
        calories={caloriesSpent}
        text={"Gastadas"}
        />

<CaloriesDisplay 
        calories={netCalories}
        text={"Saldo de calorías"}
        />

        
      </div>
    </>
  );
}
