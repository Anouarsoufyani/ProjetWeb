import { useParams } from "react-router-dom";
import { useJoinGameMutation } from "../../../hooks/game.hooks";



const JoinGame = () => {

    const joinGameMutation = useJoinGameMutation()

    const onSubmit = async (e: any) => {
        e.preventDefault();
        await joinGameMutation.mutateAsync(e);
    }

    const { code } = useParams<any>();

    return (
        <div>
            <h1>Joining : {code} </h1>
            <form onSubmit={onSubmit}>
                <button type="submit" className="btn btn-primary" disabled={joinGameMutation.isLoading}>
                    Create game
                </button>
            </form>
        </div>
    )

}

export default JoinGame