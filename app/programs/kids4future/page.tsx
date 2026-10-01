import { ProgramDetail } from "@/components/ProgramDetail";
import { getProgram } from "@/lib/programs";
export const metadata = { title: "Kids4Future" };
export default function Page(){return <ProgramDetail program={getProgram("kids4future")!}/>}
