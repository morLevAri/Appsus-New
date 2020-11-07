import { noteService } from '../services/note-service.js'
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus-service.js'



export default {
    name: 'noteEdit',
    props: ['noteId'],
    template: `
    <section >
        <ul class="note-edit-container flex">

            <li @click="pinNote">
                <i class="fas fa-thumbtack"></i>
            </li>
            
            <li @click="editNote(note)">
                <i class="fas fa-edit"></i>
            </li>

            <li @click="showColors= !showColors">
                <i class="fas fa-palette"></i>
            </li>

            <li @click="onRemove">
                <i class="fas fa-trash"></i>
            </li>
           
        </ul>
        <ul v-if="showColors" class="colors-container">
            <li class="color" style="background-color: #F9BEBD" @click="changeNoteColor($event,'#F9BEBD')"></li>
            <li class="color" style="background-color: #C1C1C1" @click="changeNoteColor($event, '#C1C1C1')"></li>
            <li class="color" style="background-color: #BFE4DD" @click="changeNoteColor($event, '#BFE4DD' )"></li>
            <li class="color" style="background-color: #FFFFFF" @click="changeNoteColor($event, '#FFFFFF')"></li>
            <li class="color" style="background-color: #ffce9b" @click="changeNoteColor($event, '#ffce9b')"></li>

        </ul>
    </section>
    `,

    data() {
        return {
            showColors: false
        }
    },

    methods: {

        changeNoteColor(event, color) {
            console.log('event-change note color', event, color)
            this.showColors = false;
            noteService.changeNoteColor(this.noteId, color);
        },
        onRemove() {
            eventBus.$emit('removeNote', this.noteId);
            const msg = {
                txt: 'Note removed',
                type: 'success'
            }
            eventBus.$emit(EVENT_SHOW_MSG, msg)
        },
        pinNote() {
            console.log('pin clicked')
            noteService.pinToStart(this.noteId);
        }

    }

}