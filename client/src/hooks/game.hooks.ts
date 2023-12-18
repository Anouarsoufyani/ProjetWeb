import { useMutation, useQuery } from "react-query"
import { GameService } from "../services/game.service"

export const useCreateGameMutation = () => {
    return useMutation({
        mutationFn: () => {
            return GameService.createGame()
        },
    })
}

export const useGetAllGames = () => {
    return useQuery({
        queryFn: () => { return GameService.getAllGames() },
        queryKey: 'get-all-games'
    })

}

export const useJoinGameMutation = () => {
    return useMutation({
        mutationFn: (game: any) => {
            return GameService.joinGame(game)
        },
    })

}