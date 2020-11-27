import $, { DomElement } from '../../utils/dom-core'
import BtnMenu from '../menu-constructors/BtnMenu'
import Editor from '../../editor/index'
import { MenuActive } from '../menu-constructors/Menu'
import { createTodo, isTodo } from './create-todo-node'
import bindEvent from './bind-event'

class Todo extends BtnMenu implements MenuActive {
    constructor(editor: Editor) {
        const $elem = $(
            `<div class="w-e-menu">
                    <i class="w-e-icon-quotes-left"></i>
                </div>`
        )
        super($elem, editor)
        bindEvent(editor)
    }

    /**
     * 点击事件
     */
    public clickHandler(): void {
        const editor = this.editor
        const topNodeElem: DomElement[] = editor.selection.getSelectionRangeTopNodes(editor)
        const $topNodeElem: DomElement = topNodeElem[topNodeElem.length - 1]
        const nodeName = $topNodeElem?.getNodeName()
        if (nodeName === 'P') {
            let $tempNode = $topNodeElem
            topNodeElem.forEach($node => {
                const todoNode = createTodo($node)
                const child = todoNode.children()?.getNode() as Node
                todoNode.insertAfter($tempNode)
                editor.selection.moveCursor(child)
                $tempNode = todoNode
                $node.remove()
            })
        } else if (isTodo(editor)) {
            // 取消设置todolist
            const br = $(`<p><br></p>`)
            br.insertAfter($topNodeElem)
            editor.selection.moveCursor(br.getNode())
            $topNodeElem.remove()
        }
    }
    tryChangeActive() {}
}

export default Todo