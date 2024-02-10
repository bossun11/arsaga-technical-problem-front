import { Post, SearchPostParams } from "@/app/types";
import { searchPostSchema } from "@/app/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getAllPosts, searchPostsByTag } from "@/app/api/posts";

type SearchPostFieldProps = {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const SearchPostField = ({ setPosts }: SearchPostFieldProps) => {
  const form = useForm<SearchPostParams>({
    resolver: zodResolver(searchPostSchema),
    defaultValues: {
      tag_name: "",
    },
  });

  const onSubmit = async (params: SearchPostParams) => {
    try {
      if (params.tag_name === "") {
        const res = await getAllPosts();
        setPosts(res.data);
      } else {
        const res = await searchPostsByTag(params);
        setPosts(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center mx-auto mb-4 gap-2"
      >
        <FormField
          control={form.control}
          name="tag_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="タグを入力してください" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">検索</Button>
      </form>
    </Form>
  );
};

export default SearchPostField;
