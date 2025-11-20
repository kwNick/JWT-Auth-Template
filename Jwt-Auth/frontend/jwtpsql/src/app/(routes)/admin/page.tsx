import AdminDashboard from "@/components/AdminDashboard";
import DeleteButton from "@/components/DeleteButton";

export default function AdminPage(){

    return(
         <div className="p-4 flex flex-col gap-y-5 justify-center min-h-[85vh] font-[family-name:var(--font-geist-sans)]">
            <AdminDashboard />

            <div className="flex flex-col gap-y-4">
                <div>
                    <h1>
                        DeleteUser...
                    </h1>
                </div>
                <div>
                    <p>
                        To delete a user, you can use the <code>DELETE</code> HTTP method on the endpoint:
                    </p>DELETE on http://localhost:8080/api/delete`
                    <p>
                        Note: Make sure to handle this operation carefully as it will permanently remove the user and their associated data.
                    </p>
                </div>
                <div>
                    <DeleteButton />
                </div>
            </div>
        </div>
    );
}