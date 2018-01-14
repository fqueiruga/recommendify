import { StartPage } from "@/app/start";
import { oAuthCallback } from "./o-auth-callback";
import { RoutePaths } from "./route-paths";

const Routes = [
  {
    path: RoutePaths.HOME,
    name: "Start Page",
    component: StartPage
  },
  {
    path: RoutePaths.OAuthCallback,
    redirect: oAuthCallback
  }
];

export { Routes };
