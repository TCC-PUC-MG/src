package br.com.sca.monitbarragem.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.monitbarragem.web.rest.TestUtil;

public class EventoBarragemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventoBarragem.class);
        EventoBarragem eventoBarragem1 = new EventoBarragem();
        eventoBarragem1.setId("id1");
        EventoBarragem eventoBarragem2 = new EventoBarragem();
        eventoBarragem2.setId(eventoBarragem1.getId());
        assertThat(eventoBarragem1).isEqualTo(eventoBarragem2);
        eventoBarragem2.setId("id2");
        assertThat(eventoBarragem1).isNotEqualTo(eventoBarragem2);
        eventoBarragem1.setId(null);
        assertThat(eventoBarragem1).isNotEqualTo(eventoBarragem2);
    }
}
