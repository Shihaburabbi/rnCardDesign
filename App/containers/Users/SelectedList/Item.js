import { connect } from 'react-redux'

import Item from '../../../Component/Users/SelectedList/Item'
import { usersSelect } from '../../../actionCreators'

const mapStateToProps = null

const mapDispatchToProps = { selectUser: usersSelect }

export default connect(mapStateToProps, mapDispatchToProps)(Item)
