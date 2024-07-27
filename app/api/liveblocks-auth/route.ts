import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});


export async function POST(request: Request) {
  // Get the current user from your database
  const authorization = await auth()
  const user = await currentUser()

//   console.log('auth',{authorization,user})

  if(!authorization || !user){
    return new Response("Unauthorized", { status : 403})
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, {id: room})

//   console.log('room',{
//     room,
//     board,
//     boarOrgId: board?.orgId
//   })

  if(board?.orgId !== authorization.orgId){
    return new Response("Unauthorized", { status: 403})
  }
  const userInfo = {
    name: user?.firstName || '',
    picture: user?.imageUrl || ''
  };

//   console.log(userInfo)

  const session = liveblocks.prepareSession(
    user.id,
    { userInfo }
  );

  if(room){
    session.allow(room, session.FULL_ACCESS)
  }
  
  const { status, body } = await session.authorize();
//   console.log({status,body})
  return new Response(body, { status });

}