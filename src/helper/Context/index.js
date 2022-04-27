import React, { createContext, useState, useEffect } from "react";

const RouterContext = createContext({});
export const RouterProvider = RouterContext.Provider;
export const RouterConsumer = RouterContext.Consumer;
export default RouterContext;
