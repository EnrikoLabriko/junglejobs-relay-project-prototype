var React = require('react');
var Relay = require('react-relay');
var GraphQLRelay = require('graphql-relay');

class App extends React.Component {
  render() {
    var globalId = GraphQLRelay.toGlobalId(1, Relay.QL`query { account }`);

    return (
      <div>
        <h2>Account:</h2>
        <ul>
          <li>Global ID: {globalId}</li>
          <li>ID: {this.props.account.id}</li>
          <li>Login: {this.props.account.login}</li>
          <li>Password: {this.props.account.password}</li>
        </ul>
        <h2>All news:</h2>
        <NewsList edges={this.props.account.news.edges} />
        <NewsListByType account={this.props.account} />
        <NewsById account={this.props.account} />
      </div>
    );
  }
}

class NewsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var condition = this.props.condition || null;
    var field = this.props.field || null;

    return (
      <ul>
        {this.props.edges.map((edge, index) => {
          if (condition && edge.node[field] === condition) {
            if (field === 'type') {
              return (
                <li
                  key={edge.node.id}
                  data-name={edge.node.name}
                  data-title={edge.node.title}
                  data-content={edge.node.content}
                  data-type={edge.node.type}>
                  NEWS |
                  Name: {edge.node.name},
                  Title: {edge.node.title},
                  Content: {edge.node.content},
                  <strong> Type: {edge.node.type}</strong>,
                  Id : {index + 1},
                  Global ID: {edge.node.id}
                </li>
              );
            } else if (field === 'id') {
              return (
                <li
                  key={edge.node.id}
                  data-name={edge.node.name}
                  data-title={edge.node.title}
                  data-content={edge.node.content}
                  data-type={edge.node.type}>
                  NEWS |
                  Name: {edge.node.name},
                  Title: {edge.node.title},
                  Content: {edge.node.content},
                  Type: {edge.node.type},
                  <strong> Id : {index + 1}</strong>,
                  Global ID: {edge.node.id}
                </li>
              );
            }
          } else if (condition === null) {
            return (
              <li
                key={edge.node.id}
                data-name={edge.node.name}
                data-title={edge.node.title}
                data-content={edge.node.content}
                data-type={edge.node.type}>
                NEWS |
                Name: {edge.node.name},
                Title: {edge.node.title},
                Content: {edge.node.content},
                Type: {edge.node.type},
                Id : {index + 1},
                Global ID: {edge.node.id}
              </li>
            );
          } else {
            return (
              <div />
            );
          }
        })}
      </ul>
    );
  }
}

class NewsListByType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  renderListByType(type) {
    var result = (
      <NewsList edges={this.props.account.news.edges} condition={type} field="type" />
    );

    this.setState({value: result});
  }

  render() {
    return (
      <div>
        <div>
          <h2>News by type:</h2>
          <button onClick={this.renderListByType.bind(this, 'breaking')}>Show breaking news</button>
          <button onClick={this.renderListByType.bind(this, 'common')}>Show common news</button>
          <div>
            {this.state.value}
          </div>
        </div>
      </div>
    );
  }
}

class NewsById extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  onChange(e) {
    var result = (
      <NewsList edges={this.props.account.news.edges} condition={e.target.value.toString()} field="id" />
    );

    this.setState({value: result});
  }

  render() {
    return (
      <div>
        <div>
          <h2>Select news by ID:</h2>
          <select name="newsId" onChange={this.onChange.bind(this)}>
            <option disabled selected value> -- select news ID -- </option>
            {this.props.account.news.edges.map((edge, index) => {
              return (
                <option
                  value={edge.node.id}
                  key={edge.node.id}
                  data-name={edge.node.name}
                  data-title={edge.node.title}
                  data-content={edge.node.content}
                  data-type={edge.node.type}>
                    ID: {index + 1}
                </option>
              );
            })}
          </select>
          <div>
            {this.state.value}
          </div>
        </div>
      </div>
    );
  }
}

exports.Container = Relay.createContainer(App, {
  fragments: {
    account: () => Relay.QL`
      fragment on Account {
        id,
        login,
        password,
        news(first: 10) {
          edges {
            node {
              id,
              name,
              title,
              content,
              type
            },
          },
        },
      }
    `
  }
});

exports.queries = {
  appQueries: {
    name: 'AppQueries',
    params: {},
    queries: {
      account: () => Relay.QL`query { account }`
    }
  }
};
