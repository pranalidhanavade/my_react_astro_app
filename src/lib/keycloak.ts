export async function getToken(payload: ClientCredentialTokenPayloadDto) {
    try {
      if (
        'client_credentials' !== payload.grant_type ||
        !payload.client_id ||
        !payload.client_secret
      ) {
        throw new Error('Invalid inputs while getting token.');
      }
      const strURL = GetSATURL("master");
      console.log(`getToken URL: ${strURL}`);
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   };
      const tokenResponse = await fetch(strURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(payload),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(errorData.errorMessage || "Failed to create user");
      }
    //   const tokenResponse = await this.commonService.httpPost(
    //     await GetSATURL(process.env.KEYCLOAK_REALM),
    //     qs.stringify(payload)
    //     , config);

      return tokenResponse;
    } catch (error) {
      throw error;
    }
  }
class ClientCredentialTokenPayloadDto {
  client_id?: string;
  client_secret?: string;
  audience?: string;
  grant_type?: string = 'client_credentials';
  scope?: string;
}


function GetSATURL(
        realm: string
      ):string {
        return `http://192.168.1.121:8080/realms/${realm}/protocol/openid-connect/token`;
    }