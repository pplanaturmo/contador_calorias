import Form from "./components/Form";
import { useReducer, useEffect, useMemo } from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import CaloriesTracker from "./components/CaloriesTracker";
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const nothingToReset= () => useMemo(()=> state.activities.length === 0, [state.activities])


  
 
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-around ">
          <h1 className="text-center text-lg font-bold">
            Contador de Calorias
          </h1>
          <button 
          className="bg-gray-600 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-md text-sm"
          hidden={nothingToReset()}
          disabled={nothingToReset()}
          onClick={()=> dispatch({type: 'restart-app'})}
          >
            Reiniciar
          </button>
        </div>
      </header>
      <section className="bg-lime-100 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className="bg-gray-800 py-10 ">
      <div className="max-w-4xl mx-auto">
        <CaloriesTracker 
        activities = {state.activities}
        ></CaloriesTracker>
      </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
