import { StartPage } from "@/pages/start";
import { ExplorePage } from "@/pages/explore";
import { oAuthCallback } from "./router-authentication";
import { RoutePaths } from "./route-paths";

const Routes = [
  {
    path: RoutePaths.Home,
    name: "Start",
    component: StartPage
  },
  {
    path: RoutePaths.Explore,
    name: "Explore",
    component: ExplorePage
  },
  {
    path: RoutePaths.OAuthCallback,
    redirect: oAuthCallback
  }
];

export { Routes };
