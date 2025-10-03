import { AuthenticatedLayout } from "~/components/layout/authenticated-layout";
import TodoList from "~/components/TodoList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";


export default function TodosPage() {

  return (
    <AuthenticatedLayout>
    <TodoList />
    </AuthenticatedLayout>
  );
}