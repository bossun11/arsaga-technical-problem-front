import { Badge } from "@/components/ui/badge";

type PostTagProps = {
  name: string;
};

const PostTag = ({ name }: PostTagProps) => {
  return <Badge className="bg-deepRed pointer-events-none">{name}</Badge>;
};

export default PostTag;
