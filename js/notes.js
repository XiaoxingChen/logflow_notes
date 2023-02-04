import {basicHeadSetting} from './note_basic.js'
import {createTableOfContents} from './table_of_contents.js'
import {assignHeadingFeatures} from './heading_feature.js'

let max_featured_heading_level = 3

basicHeadSetting()
assignHeadingFeatures(max_featured_heading_level)
createTableOfContents(max_featured_heading_level)