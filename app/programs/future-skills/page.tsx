import { ProgramDetail } from "@/components/ProgramDetail";
import { getProgram } from "@/lib/programs";
export const metadata = { title: "Future Skills" };
export default function Page(){return <ProgramDetail program={getProgram("future-skills")!}/>}
