import getAdmin from "@/actions/get-admin";

const TestPage = async () => {
    const res = await getAdmin()

    return (
        <div>
            {JSON.stringify(res)}
        </div>
    )
}

export default TestPage