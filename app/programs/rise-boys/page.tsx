import { ProgramDetail } from "@/components/ProgramDetail";
import { getProgram } from "@/lib/programs";
export const metadata = { title: "Rise Boys" };
export default function Page(){return <ProgramDetail program={getProgram("rise-boys")!}/>}
