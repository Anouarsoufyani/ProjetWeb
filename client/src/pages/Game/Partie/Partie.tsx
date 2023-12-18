import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";
import { useGetAllGames } from "../../../hooks/game.hooks"

const Partie = () => {

    const getAllGamesQuery = useGetAllGames()

    const games = getAllGamesQuery.data?.data.games;

    console.log({ games })

    return (
        <>
            {getAllGamesQuery.isLoading ? (
                <div>Loqding</div>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Game Number</TableCell>
                                <TableCell align="left">NbPlayers</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Join</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games.map((game: any) => (
                                <TableRow
                                    key={game.type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{game.code}</TableCell>
                                    <TableCell align="left">{game.players.length}/10</TableCell>
                                    <TableCell align="left">{game.status}</TableCell>
                                    <TableCell align="left"> <Link href={game.code}>Join the game</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
            )}


        </>
    )
}

export default Partie