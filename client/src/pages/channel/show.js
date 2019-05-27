import React from "react";
import Typography from "@material-ui/core/Typography";
import SimpleTable from "../../components/tables/SimpleTable";
import PropTypes from "prop-types";
import SimpleLineChart from "../../components/charts/SimpleLineChart";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import ApiClient from "../../utils/ApiClient";

const columnNames = [
  'name', 'topic', 'purpose', 'member_count', 'message_count'
];

export default class ChannelShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: [],
      groupdate: {},
      rankSortedEmojis: [],
      rankSortedUsers: [],
      channel_id: props.match.params.id
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData() {
    ApiClient
      .get(`/channels/${this.state.channel_id}.json`)
      .then(results => {
        const data = results.data;
        // dataがarrayじゃないのでarrayにする
        this.setState({
          channel: [data]
        });
      });

    ApiClient
      .get(`/channels/${this.state.channel_id}/message_groupdate`)
      .then(results => {
        const data = results.data;
        this.setState({
          groupdate: data
        });
      });

    ApiClient
      .get(`/channels/${this.state.channel_id}/channel_emoji`)
      .then(results => {
        const data = results.data;
        this.setState({
          rankSortedEmojis: data
        });
      });

    ApiClient
      .get(`/channels/${this.state.channel_id}/users`)
      .then(results => {
        const data = results.data;
        this.setState({
          rankSortedUsers: data
        });
      });
  }

  render() {
    const {classes, match} = this.props;
    const ranking_max = 10;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          特定のチャンネル channel_id:{match.params.id}
        </Typography>
        <div className={classes.tableContainer}>
          <Typography variant='h6'>概要</Typography>
          <SimpleTable data={this.state.channel} columnNames={columnNames}/>
          <Typography variant='h6'>使用された絵文字ランキング</Typography>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ranking</TableCell>
                  <TableCell>count</TableCell>
                  <TableCell>image</TableCell>
                  <TableCell>slack_name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rankSortedEmojis.slice(0, ranking_max).map((row, i) => (
                  <TableRow key={row.emoji.id}>
                    <TableCell component="th" scope="row">{i + 1}</TableCell>
                    <TableCell component="th" scope="row">{row.count}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.emoji.url.startsWith('https') ?
                        <img src={row.emoji.url} alt="" width="32" height="32" border=""/> : 'alias/no-data'
                      }
                    </TableCell>
                    <TableCell component="th" scope="row">{row.emoji.slack_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Typography component="div" className={classes.chartContainer}>
            <Typography variant='h6'>１時間毎のメッセージ数推移</Typography>
            <SimpleLineChart
              data={this.state.groupdate.data}
              labels={this.state.groupdate.labels}/>
          </Typography>
          <Typography variant='h6'>発言者ランキング</Typography>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ranking</TableCell>
                  <TableCell>count</TableCell>
                  <TableCell>image</TableCell>
                  <TableCell>名前</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rankSortedUsers.slice(0, ranking_max).map((row, i) => (
                  <TableRow key={row.user.id}>
                    <TableCell component="th" scope="row">{i + 1}</TableCell>
                    <TableCell component="th" scope="row">{row.messages_count}</TableCell>
                    <TableCell component="th" scope="row">
                      <img src={row.user.profile_image} alt="" width="32" height="32" border=""/>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.user.real_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </main>
    );
  }
}

ChannelShow.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
