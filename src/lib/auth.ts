import type { AstroCookies } from "astro";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "master",
  clientId: "nextjs-app",
});

export const initAuth = async () => {
  return keycloak.init({ onLoad: "login-required", checkLoginIframe: true }).then((authenticated) => {
    if (authenticated) {
      document.cookie = `auth_token=${keycloak.token}; Path=/; Domain=localhost; Secure; SameSite=None`;
    }
    return keycloak;
  });
};

// export const setToCookies = (

//   cookies: AstroCookies,
//   key: string,
//   value: any,
//   option: { [key: string]: any }
// ) => {
//   // If passed value is object then checked empty object
//   if (typeof value === "object" && Boolean(Object.keys(value).length <= 0)) {
//     return;
//   }

//   // If passed value is string then checked if value is falsy
//   if (typeof value === "string" && !value?.trim()) {
//     return;
//   }

//   // Set HttpOnly, Secure, and SameSite attributes in the options
//   const updatedOption: { [key: string]: any } = {
//     ...option,
//     httpOnly: true,
//     secure: true, // Set to true if using HTTPS
//     sameSite: "None",
//   };
//   cookies.set(key, value as string, updatedOption);

//   return true;
// };

// export const getFromCookies = (cookies: AstroCookies, key: string) => {
//   const value = cookies.get(key)?.value;
//   return value;
// };

// export const checkUserSession = async ({
//   cookies,
//   currentPath,
// }: IProps): Promise<IOutput> => {
//   const sessionCookie = getFromCookies(cookies, "session");

//   if (!sessionCookie) {
//     return {
//       permitted: false,
//       redirect: pathRoutes.auth.sinIn,
//       authorized: false,
//     };
//   }

//   try {
//     const baseURL =
//       import.meta.env.PUBLIC_BASE_URL || process.env.PUBLIC_BASE_URL;
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionCookie + ""}`,
//       },
//       method: "GET",
//     };
//     const res = await fetch(`${baseURL + apiRoutes.users.userProfile}`, {
//       ...config,
//     });
//     const userData = await res.json();
//     console.log("Check Authorized User:::", {
//       status: userData.statusCode,
//       message: userData.message,
//     });

//     if (userData?.statusCode === apiStatusCodes.API_STATUS_UNAUTHORIZED) {
//       const refreshSession = getFromCookies(cookies, "refresh");

//       const configRefreshToken = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({
//           refreshToken: refreshSession,
//         }),
//       };

//       const res = await fetch(`${baseURL + apiRoutes.auth.refreshToken}`, {
//         ...configRefreshToken,
//       });
//       const userSession = await res.json();

//       if (userSession?.statusCode !== apiStatusCodes.API_STATUS_SUCCESS) {
//         return {
//           permitted: false,
//           redirect: pathRoutes.auth.sinIn,
//           authorized: false,
//         };
//       }
//       setToCookies(
//         cookies,
//         "session",
//         userSession?.data?.access_token as string,
//         {
//           path: "/",
//         }
//       );
//       setToCookies(
//         cookies,
//         "refresh",
//         userSession?.data?.refresh_token as string,
//         {
//           path: "/",
//         }
//       );

//       return {
//         permitted: true,
//         authorized: true,
//       };
//     }
//   } catch (error) {
//     console.log("GET USER DETAILS ERROR::::", error);
//   }

//   const role = getFromCookies(cookies, "role");
//   const permittedPages = RolePermissions.find(
//     (item) => item.role === role
//   )?.pages;

//   if (!permittedPages?.includes(currentPath)) {
//     if (permittedPages) {
//       return {
//         permitted: false,
//         redirect: permittedPages[0],
//         authorized: true,
//       };
//     } else {
//       return {
//         permitted: true,
//         redirect: pathRoutes.users.dashboard,
//         authorized: true,
//       };
//     }
//   }
//   return {
//     permitted: true,
//     authorized: true,
//   };
// };

interface IProps {
  cookies: AstroCookies;
  currentPath: string;
}

interface IOutput {
  permitted: boolean;
  redirect?: string;
  authorized?: boolean;
}
// export const setToCookies = (
//   key: string,
//   value: any,
//   option: { [key: string]: any }
// ) => {
//   if (typeof value === "object" && Object.keys(value).length === 0) return;
//   if (typeof value === "string" && !value.trim()) return;
//   let None: "none" = "none"

//   const updatedOption = {
//     ...option,
//     httpOnly: true,
//     secure: true,
//     sameSite: None,
//   };
//   const cookies = await getFromCookies();

//   cookies.set(key, value as string, updatedOption);
//   return true;
// };

export const getFromCookies = (cookies: AstroCookies, key: string) => {
  return cookies.get(key)?.value;
};

export const checkUserSession = async ({
  cookies,
}: IProps): Promise<IOutput> => {
  const sessionCookie = getFromCookies(cookies, "session");

  try {
  if (!sessionCookie) {
    return {
      permitted: false,
      redirect: "/login",
      authorized: false,
    };
  }

    return { permitted: true, authorized: true };
  } catch (error) {
    console.error("GET USER DETAILS ERROR:", error);
    return {
      permitted: false,
      redirect: '/login',
      authorized: false,
    };
  }
};
