import { useQuery } from '@tanstack/react-query';

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

function App() {
    const fetchUsers = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        return res.json();
    };

    const { isPending, data } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    if (isPending) return 'Loading...';

    return (
        <div className="flex flex-wrap">
            {data?.map((user: User) => {
                return (
                    <div key={user?.id} className="w-1/4 h-28 whitespace-normal">
                        <h3>{user?.name}</h3>
                        <p>{user?.email}</p>
                        <p>{user?.phone}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
