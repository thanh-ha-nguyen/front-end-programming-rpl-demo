import React, { createContext, useContext, useEffect, useState } from "react";

interface AppPageContextProps {
  title?: string;
}

const AppPageContext = createContext<AppPageContextProps>({});
const AppPageContextValueContext = createContext<
  React.Dispatch<React.SetStateAction<AppPageContextProps>>
>(() => void 0);

const AppPageContextProvider: React.FC<
  React.PropsWithChildren<AppPageContextProps>
> = ({ children, ...defaultValue }) => {
  const [value, setValue] = useState<AppPageContextProps>(defaultValue);
  return (
    <AppPageContextValueContext.Provider value={setValue}>
      <AppPageContext.Provider value={value}>
        {children}
      </AppPageContext.Provider>
    </AppPageContextValueContext.Provider>
  );
};

export default AppPageContextProvider;

// eslint-disable-next-line react-refresh/only-export-components
export function useAppPageContext() {
  return useContext(AppPageContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppPageContextValue(value: AppPageContextProps) {
  const setValue = useContext(AppPageContextValueContext);
  useEffect(() => {
    setValue(value);
  }, [value, setValue])
}
