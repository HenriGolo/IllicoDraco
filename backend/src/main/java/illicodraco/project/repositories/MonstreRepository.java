package illicodraco.project.repositories;

import illicodraco.project.beans.Monstre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository du Monstre
public interface MonstreRepository extends JpaRepository<Monstre, Integer> {

  Monstre save(Monstre monstre);

  Optional<Monstre> findById(Integer id);

  List<Monstre> findAll();

  long count();

}
