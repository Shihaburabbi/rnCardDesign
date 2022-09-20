import { connect } from 'react-redux'

import UsersFilter from '../../Component/Users/Filter'
import { usersGet, usersSetFilter } from '../../actionCreators'

const mapStateToProps = ({ users }) => ({
  filter: users.filter,
  page: users.page,
})

const mapDispatchToProps = {
  getUsers: usersGet,
  setFilter: usersSetFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersFilter)