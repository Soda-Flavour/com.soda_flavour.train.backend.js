import Knex from "knex";
import knex from "../../database/connection";

export function isExistEmail(reqParams: any): Promise<Knex<any, unknown[]>> {
  return knex
    .select("id", "nick", "email", "password")
    .from("t_user")
    .where("email", "=", reqParams["email"])
    .first();
}

export function isExistNickname(reqParams: any): Promise<Knex<any, unknown[]>> {
  return knex
    .select("email")
    .from("t_user")
    .where("email", "=", reqParams["nick"])
    .first();
}

export async function createUser(userDataParams: any) {
  try {
    await knex.transaction(async (trx) => {
      const insertedUserId: number = await trx("t_user").insert(userDataParams);
      const _result = await trx("t_user_physical").insert({
        ["t_user_id"]: insertedUserId,
      });
      return true;
    });
  } catch (error) {
    console.log("tran에러 발생");
    console.error(error);
    return false;
  }
}
