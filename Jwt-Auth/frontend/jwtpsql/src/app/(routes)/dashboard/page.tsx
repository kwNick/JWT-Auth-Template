import DeleteButton from "@/components/DeleteButton";
import ProfileDashboard from "@/components/ProfileDashboard";

export default function ProfilePage() {

  return (
    <div className="p-4 flex flex-col gap-y-5 justify-center min-h-[85vh] min-w-4/5 font-[family-name:var(--font-geist-sans)]">
      <ProfileDashboard />
      
      <div className="flex flex-col gap-y-4">
        <div>
          <h1>DeleteUser...</h1>
        </div>
        <div>
          <p>To delete a user, use the <code>DELETE</code> HTTP method on the endpoint: <code>DELETE http://localhost:8080/api/delete</code></p>
          <p>Note: This will permanently remove the user and all associated data.</p>
        </div>
        <div>
          <DeleteButton />
        </div>
      </div>
      
    </div>
  );
}
